import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { taskService } from "@/services/api/taskService";
import { useAuth } from "@/layouts/Root";
import { useSelector } from "react-redux";
import { filterTasks, searchTasks, sortTasks } from "@/utils/taskUtils";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import ErrorView from "@/components/ui/ErrorView";
import TaskFilters from "@/components/organisms/TaskFilters";
import TaskStats from "@/components/organisms/TaskStats";
import TaskForm from "@/components/organisms/TaskForm";
import TaskList from "@/components/organisms/TaskList";
import Button from "@/components/atoms/Button";

const TaskManager = () => {
  const { logout } = useAuth()
const { user, roleName } = useSelector(state => state.user)
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    status: "all",
    priority: null,
    sortBy: "createdAt"
  })
  
  const [editingTask, setEditingTask] = useState(null)

  const loadTasks = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const tasksData = await taskService.getAll()
      setTasks(tasksData)
    } catch (err) {
      console.error("Error loading tasks:", err)
      setError(err.message || "Failed to load tasks")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const handleTaskCreated = () => {
    loadTasks()
  }

  const handleTaskUpdated = () => {
    loadTasks()
  }

  const handleTaskDeleted = () => {
    loadTasks()
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleEditCancel = () => {
    setEditingTask(null)
  }

  // Process and filter tasks
  const filteredTasks = searchTasks(
    sortTasks(
      filterTasks(tasks, filters),
      filters.sortBy
    ),
    searchQuery
  )
return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header with user info and logout */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              TaskFlow, {roleName}
            </h1>
            <p className="text-slate-600">
              Welcome back, {user?.firstName || user?.emailAddress || 'User'}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={logout}
            className="flex items-center gap-2"
          >
            <ApperIcon name="LogOut" size={16} />
            Logout
          </Button>
        </div>

        {/* Task Statistics */}
        <TaskStats tasks={tasks} />

        {/* Task Form */}
        <TaskForm
          editTask={editingTask}
          onTaskCreated={handleTaskCreated}
          onTaskUpdated={handleTaskUpdated}
          onEditCancel={handleEditCancel}
        />

        {/* Filters and Search */}
        <div className="space-y-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search tasks..."
          />
          
          <TaskFilters
            tasks={tasks}
            filters={filters}
            onFiltersChange={setFilters}
          />
        </div>

<div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              {searchQuery ? (
                <>Search Results ({filteredTasks.length})</>
              ) : filters.status === "all" ? (
                <>All Tasks ({filteredTasks.length})</>
              ) : filters.status === "active" ? (
                <>Active Tasks ({filteredTasks.length})</>
              ) : (
                <>Completed Tasks ({filteredTasks.length})</>
              )}
            </h2>
            
            {filteredTasks.length > 0 && (
              <div className="text-sm text-slate-500">
                Sorted by {filters.sortBy === "createdAt" ? "creation date" : 
                         filters.sortBy === "dueDate" ? "due date" : "priority"}
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >

          <TaskList
            tasks={filteredTasks}
            onTaskUpdate={handleTaskUpdated}
            onTaskDelete={handleTaskDeleted}
            onTaskEdit={handleEditTask}
onCreateTask={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            searchQuery={searchQuery}
          />
        </motion.div>
      </div>
        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 py-8 border-t border-slate-200"
        >
          <p className="text-slate-500 text-sm">
            Stay organized, stay productive. Built with ❤️ for getting things done.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default TaskManager