export const generateId = () => {
  return crypto.randomUUID ? crypto.randomUUID() : 
    'task-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
}

export const sortTasks = (tasks, sortBy) => {
  const sortedTasks = [...tasks]
  
  switch (sortBy) {
    case "dueDate":
      return sortedTasks.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate) - new Date(b.dueDate)
      })
    
    case "priority":
      const priorityOrder = { "high": 3, "medium": 2, "low": 1 }
      return sortedTasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
    
    case "createdAt":
    default:
      return sortedTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }
}

export const filterTasks = (tasks, filters) => {
  let filtered = tasks
  
  // Filter by status
  if (filters.status === "active") {
    filtered = filtered.filter(task => !task.completed)
  } else if (filters.status === "completed") {
    filtered = filtered.filter(task => task.completed)
  }
  
  // Filter by priority
  if (filters.priority && filters.priority !== "all") {
    filtered = filtered.filter(task => task.priority === filters.priority)
  }
  
  return filtered
}

export const searchTasks = (tasks, query) => {
  if (!query.trim()) return tasks
  
  const searchTerm = query.toLowerCase()
  return tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm) ||
    task.description.toLowerCase().includes(searchTerm)
  )
}

export const getTaskStats = (tasks) => {
  const total = tasks.length
  const completed = tasks.filter(task => task.completed).length
  const active = total - completed
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0
  
  return { total, completed, active, completionRate }
}

export const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "text-indigo-600 bg-indigo-100 border-indigo-200"
    case "medium":
      return "text-purple-600 bg-purple-100 border-purple-200"
    case "low":
      return "text-pink-600 bg-pink-100 border-pink-200"
    default:
      return "text-slate-600 bg-slate-100 border-slate-200"
  }
}