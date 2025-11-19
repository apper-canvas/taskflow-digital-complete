import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import ErrorView from "@/components/ui/ErrorView"
import TaskStats from "@/components/organisms/TaskStats"
import TaskForm from "@/components/organisms/TaskForm"
import TaskFilters from "@/components/organisms/TaskFilters"
import TaskList from "@/components/organisms/TaskList"
import { taskService } from "@/services/api/taskService"
import { sortTasks, filterTasks, searchTasks } from "@/utils/taskUtils"

const TaskManager = () => {
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

  // Filter and sort tasks
  const filteredTasks = searchTasks(
    sortTasks(
      filterTasks(tasks, filters),
      filters.sortBy
    ),
    searchQuery
  )

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorView error={error} onRetry={loadTasks} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-indigo-600 rounded-xl flex items-center justify-center mr-3">
              <ApperIcon name="CheckCircle" size={24} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-primary to-indigo-700 bg-clip-text text-transparent">
              TaskFlow
            </h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Your personal task management companion. Organize your work, track your progress, 
            and achieve your goals with effortless simplicity.
          </p>
        </motion.div>

        {/* Stats */}
        <TaskStats tasks={tasks} />

        {/* Task Form */}
        <TaskForm
          onTaskCreated={handleTaskCreated}
          editTask={editingTask}
          onEditCancel={handleEditCancel}
        />

        {/* Filters */}
        <TaskFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filters={filters}
          onFiltersChange={setFilters}
          tasks={tasks}
        />

        {/* Task List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900">
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

          <TaskList
            tasks={filteredTasks}
            onTaskUpdate={handleTaskUpdated}
            onTaskDelete={handleTaskDeleted}
            onTaskEdit={handleEditTask}
            onCreateTask={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            searchQuery={searchQuery}
          />
        </motion.div>

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