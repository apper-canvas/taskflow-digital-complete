import { motion, AnimatePresence } from "framer-motion"
import TaskCard from "@/components/organisms/TaskCard"
import Empty from "@/components/ui/Empty"

const TaskList = ({ 
  tasks = [], 
  onTaskUpdate, 
  onTaskDelete, 
  onTaskEdit,
  onCreateTask,
  searchQuery = "",
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-xl p-6 border border-slate-200 animate-pulse">
            <div className="flex items-start gap-4">
              <div className="w-5 h-5 bg-slate-200 rounded"></div>
              <div className="flex-1">
                <div className="w-3/4 h-5 bg-slate-200 rounded mb-2"></div>
                <div className="w-1/2 h-4 bg-slate-200 rounded mb-4"></div>
                <div className="flex gap-2">
                  <div className="w-16 h-6 bg-slate-200 rounded-full"></div>
                  <div className="w-20 h-6 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (tasks.length === 0) {
    if (searchQuery) {
      return (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No tasks found</h3>
          <p className="text-slate-600">
            No tasks match your search for "{searchQuery}"
          </p>
        </div>
      )
    }
    
    return <Empty onCreateTask={onCreateTask} />
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onUpdate={onTaskUpdate}
            onDelete={onTaskDelete}
            onEdit={onTaskEdit}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default TaskList