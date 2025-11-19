import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-toastify"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import Checkbox from "@/components/atoms/Checkbox"
import { taskService } from "@/services/api/taskService"
import { formatRelativeDate, getDueDateColor, isPastDue } from "@/utils/dateUtils"

const ConfettiParticle = ({ delay = 0 }) => (
  <motion.div
    initial={{ scale: 0, rotate: 0, opacity: 1 }}
    animate={{ 
      scale: [0, 1, 0], 
      rotate: [0, 180, 360],
      opacity: [1, 1, 0],
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50
    }}
    transition={{ 
      duration: 0.8,
      delay: delay / 1000,
      ease: "easeOut"
    }}
    className="absolute w-2 h-2 bg-gradient-to-r from-accent to-pink-600 rounded-full"
    style={{
      left: "50%",
      top: "50%"
    }}
  />
)

const TaskCard = ({ task, onUpdate, onDelete, onEdit }) => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleToggleComplete = async () => {
    setIsUpdating(true)
    
    try {
      const updatedTask = await taskService.toggleComplete(task.id)
      
      if (updatedTask.completed) {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 1000)
        toast.success("🎉 Task completed! Great job!", {
          className: "bg-gradient-to-r from-success to-green-600 text-white"
        })
      } else {
        toast.info("Task marked as incomplete")
      }
      
      onUpdate?.()
    } catch (error) {
      console.error("Error updating task:", error)
      toast.error("Failed to update task")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this task?")) {
      return
    }
    
    setIsDeleting(true)
    
    try {
      await taskService.delete(task.id)
      toast.success("Task deleted successfully")
      onDelete?.()
    } catch (error) {
      console.error("Error deleting task:", error)
      toast.error("Failed to delete task")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      whileHover={{ scale: 1.01 }}
      className={`task-card relative ${task.completed ? "opacity-75" : ""}`}
    >
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {Array.from({ length: 12 }).map((_, i) => (
            <ConfettiParticle key={i} delay={i * 50} />
          ))}
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className="pt-1">
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
            disabled={isUpdating}
            className="hover:scale-110 transition-transform duration-200"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <h3 className={`font-semibold text-slate-900 leading-snug ${
              task.completed ? "line-through text-slate-500" : ""
            }`}>
              {task.title}
            </h3>
            
            <div className="flex items-center gap-2 ml-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit?.(task)}
                disabled={isUpdating || isDeleting}
                className="text-slate-500 hover:text-primary hover:bg-primary/10 p-2"
              >
                <ApperIcon name="Edit2" size={14} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                disabled={isUpdating || isDeleting}
                loading={isDeleting}
                className="text-slate-500 hover:text-error hover:bg-error/10 p-2"
              >
                <ApperIcon name="Trash2" size={14} />
              </Button>
            </div>
          </div>
{task.description && (
            <p className={`text-slate-600 text-sm mb-4 leading-relaxed ${
              task.completed ? "text-slate-400" : ""
            }`}>
              {task.description}
            </p>
          )}

          {/* File Attachments */}
          {task.attachments && task.attachments.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <ApperIcon name="Paperclip" size={14} className="text-slate-500" />
                <span className="text-xs font-medium text-slate-600">
                  {task.attachments.length} attachment{task.attachments.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="space-y-2">
                {task.attachments.slice(0, 3).map((file, index) => (
                  <div 
                    key={file.Id || file.id || index}
                    className="flex items-center gap-2 p-2 bg-slate-50 rounded-md border border-slate-200"
                  >
                    <ApperIcon name="File" size={14} className="text-slate-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-700 truncate">
                        {file.Name || file.name || 'Unnamed File'}
                      </p>
                      {file.Size && (
                        <p className="text-xs text-slate-500">
                          {(file.Size / 1024).toFixed(1)} KB
                        </p>
                      )}
                    </div>
                    {file.Url && (
                      <a
                        href={file.Url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-dark transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ApperIcon name="Download" size={14} />
                      </a>
                    )}
                  </div>
                ))}
                {task.attachments.length > 3 && (
                  <div className="text-xs text-slate-500 text-center py-1">
                    +{task.attachments.length - 3} more file{task.attachments.length - 3 !== 1 ? 's' : ''}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant={task.priority} size="sm">
                {task.priority === "high" && <ApperIcon name="AlertCircle" size={12} className="mr-1" />}
                {task.priority === "medium" && <ApperIcon name="Circle" size={12} className="mr-1" />}
                {task.priority === "low" && <ApperIcon name="Minus" size={12} className="mr-1" />}
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </Badge>
              
              {task.dueDate && (
                <div className={`flex items-center text-sm ${getDueDateColor(task.dueDate)}`}>
                  <ApperIcon 
                    name={isPastDue(task.dueDate) ? "AlertTriangle" : "Calendar"} 
                    size={14} 
                    className="mr-1" 
                  />
                  {formatRelativeDate(task.dueDate)}
                </div>
              )}
            </div>

            {task.completed && task.completedAt && (
              <div className="flex items-center text-xs text-success">
                <ApperIcon name="CheckCircle" size={12} className="mr-1" />
                Completed
              </div>
            )}
</div>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskCard