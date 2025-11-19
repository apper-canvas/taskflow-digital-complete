import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperFileFieldComponent from "@/components/atoms/FileUploader/ApperFileFieldComponent";
import { taskService } from "@/services/api/taskService";
import { formatDateForInput } from "@/utils/dateUtils";
import ApperIcon from "@/components/ApperIcon";
import FormField from "@/components/molecules/FormField";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";

const TaskForm = ({ onTaskCreated, editTask, onEditCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    attachments: []
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isExpanded, setIsExpanded] = useState(!!editTask);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form data when editTask changes
  useEffect(() => {
    if (editTask) {
      setFormData({
        title: editTask.title || '',
        description: editTask.description || '',
        priority: editTask.priority || 'medium',
        dueDate: formatDateForInput(editTask.dueDate) || '',
        attachments: editTask.attachments || []
      });
    }
  }, [editTask]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Task title is required";
    } else if (formData.title.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const taskData = {
        ...formData,
        dueDate: formData.dueDate || null
      }
      
      if (editTask) {
        await taskService.update(editTask.id, taskData)
        toast.success("Task updated successfully!")
        onEditCancel?.()
      } else {
        await taskService.create(taskData)
        toast.success("Task created successfully!")
        
        // Reset form
        setFormData({
          title: "",
          description: "",
          priority: "medium",
          dueDate: ""
        })
        setIsExpanded(false)
      }
      
      onTaskCreated?.()
      setErrors({})
    } catch (error) {
      console.error("Error saving task:", error)
      toast.error(editTask ? "Failed to update task" : "Failed to create task")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  if (!editTask && !isExpanded) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 border border-slate-200 mb-8"
      >
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full text-left group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 group-hover:text-primary transition-colors duration-200">
                Add new task
              </h3>
              <p className="text-slate-600 text-sm">
                Click to create a new task
              </p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-indigo-100 rounded-full flex items-center justify-center group-hover:from-primary/20 group-hover:to-indigo-200 transition-all duration-200">
              <ApperIcon name="Plus" size={20} className="text-primary" />
            </div>
          </div>
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 border border-slate-200 mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">
          {editTask ? "Edit Task" : "Create New Task"}
        </h3>
        
        {!editTask && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(false)}
            className="text-slate-500 hover:text-slate-700"
          >
<ApperIcon name="X" size={16} />
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          label="Task Title"
          required
          error={errors.title}
        >
          <Input
            value={formData.title}
            onChange={handleChange("title")}
            placeholder="Enter task title..."
            error={!!errors.title}
            autoFocus={!editTask}
          />
        </FormField>

        <FormField
          label="Description"
          error={errors.description}
        >
          <Textarea
            value={formData.description}
            onChange={handleChange("description")}
            placeholder="Add task description (optional)..."
            rows={3}
            error={!!errors.description}
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField label="Priority">
            <Select
              value={formData.priority}
              onChange={handleChange("priority")}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </Select>
          </FormField>

          <FormField label="Due Date">
            <Input
              type="date"
              value={formData.dueDate}
              onChange={handleChange("dueDate")}
            />
          </FormField>
        </div>
{/* File Upload Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            File Attachments
          </label>
          <div className="border border-slate-200 rounded-md p-3 bg-slate-50">
            <ApperFileFieldComponent
              elementId={`task-form-${editTask?.id || 'new'}`}
              config={{
                fieldKey: `task-file-${editTask?.id || Date.now()}`,
                fieldName: 'file_c',
                tableName: 'task_c',
                apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
                apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY,
                existingFiles: formData.attachments || [],
                fileCount: (formData.attachments || []).length
              }}
            />
          </div>
          <p className="text-xs text-slate-500">
            You can upload files to attach to this task
          </p>
        </div>
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
          {editTask && (
            <Button
              type="button"
              variant="ghost"
              onClick={onEditCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}
          
          <Button
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
            className="bg-gradient-to-r from-primary to-indigo-600 hover:from-indigo-600 hover:to-indigo-700"
          >
            <ApperIcon name="Plus" size={16} className="mr-2" />
            {editTask ? "Update Task" : "Create Task"}
          </Button>
        </div>
      </form>
    </motion.div>
  )
}

export default TaskForm