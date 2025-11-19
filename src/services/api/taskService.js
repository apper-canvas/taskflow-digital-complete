import { generateId } from "@/utils/taskUtils"

const STORAGE_KEY = "taskflow_tasks"

// Get tasks from localStorage
const getTasksFromStorage = () => {
  try {
    const tasks = localStorage.getItem(STORAGE_KEY)
    return tasks ? JSON.parse(tasks) : []
  } catch (error) {
    console.error("Error reading tasks from localStorage:", error)
    return []
  }
}

// Save tasks to localStorage
const saveTasksToStorage = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch (error) {
    console.error("Error saving tasks to localStorage:", error)
  }
}

// Simulate API delay for realistic loading states
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const taskService = {
  async getAll() {
    await delay(200)
    return getTasksFromStorage()
  },

  async getById(id) {
    await delay(100)
    const tasks = getTasksFromStorage()
    return tasks.find(task => task.id === id) || null
  },

  async create(taskData) {
    await delay(300)
    const tasks = getTasksFromStorage()
    
    const newTask = {
      id: generateId(),
      title: taskData.title || "",
      description: taskData.description || "",
      priority: taskData.priority || "medium",
      dueDate: taskData.dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
      ...taskData
    }
    
    const updatedTasks = [newTask, ...tasks]
    saveTasksToStorage(updatedTasks)
    
    return { ...newTask }
  },

  async update(id, updateData) {
    await delay(250)
    const tasks = getTasksFromStorage()
    
    const taskIndex = tasks.findIndex(task => task.id === id)
    if (taskIndex === -1) {
      throw new Error("Task not found")
    }
    
    const updatedTask = {
      ...tasks[taskIndex],
      ...updateData
    }
    
    // Set completedAt timestamp when marking as completed
    if (updateData.completed && !tasks[taskIndex].completed) {
      updatedTask.completedAt = new Date().toISOString()
    } else if (updateData.completed === false) {
      updatedTask.completedAt = null
    }
    
    tasks[taskIndex] = updatedTask
    saveTasksToStorage(tasks)
    
    return { ...updatedTask }
  },

  async delete(id) {
    await delay(200)
    const tasks = getTasksFromStorage()
    
    const filteredTasks = tasks.filter(task => task.id !== id)
    saveTasksToStorage(filteredTasks)
    
    return { success: true }
  },

  async toggleComplete(id) {
    await delay(150)
    const tasks = getTasksFromStorage()
    
    const taskIndex = tasks.findIndex(task => task.id === id)
    if (taskIndex === -1) {
      throw new Error("Task not found")
    }
    
    const task = tasks[taskIndex]
    const updatedTask = {
      ...task,
      completed: !task.completed,
      completedAt: !task.completed ? new Date().toISOString() : null
    }
    
    tasks[taskIndex] = updatedTask
    saveTasksToStorage(tasks)
    
    return { ...updatedTask }
  }
}