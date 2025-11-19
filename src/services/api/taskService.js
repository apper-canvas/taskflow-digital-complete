import { getApperClient } from "@/services/apperClient"

const TABLE_NAME = 'task_c'

// Get all tasks with proper field mapping
const getAll = async () => {
  try {
    const apperClient = getApperClient()
    if (!apperClient) {
      throw new Error('ApperClient not available')
    }

    const params = {
      fields: [
        {"field": {"Name": "Name"}},
        {"field": {"Name": "Tags"}},
        {"field": {"Name": "title_c"}},
        {"field": {"Name": "description_c"}},
        {"field": {"Name": "priority_c"}},
        {"field": {"Name": "dueDate_c"}},
        {"field": {"Name": "completed_c"}},
        {"field": {"Name": "CreatedOn"}},
        {"field": {"Name": "ModifiedOn"}}
      ],
      orderBy: [{"fieldName": "CreatedOn", "sorttype": "DESC"}]
    }

    const response = await apperClient.fetchRecords(TABLE_NAME, params)

    if (!response.success) {
      console.error(response.message)
      throw new Error(response.message)
    }

    // Transform data to match UI expectations
    const tasks = response.data || []
    return tasks.map(task => ({
      id: task.Id,
      title: task.title_c || '',
      description: task.description_c || '',
      priority: task.priority_c || 'medium',
      dueDate: task.dueDate_c || null,
      completed: task.completed_c || false,
      createdAt: task.CreatedOn,
      completedAt: task.completed_c ? task.ModifiedOn : null,
      tags: task.Tags || '',
      name: task.Name || ''
    }))
  } catch (error) {
    console.error("Error fetching tasks:", error?.response?.data?.message || error)
    throw error
  }
}

// Get task by ID
const getById = async (id) => {
  try {
    const apperClient = getApperClient()
    if (!apperClient) {
      throw new Error('ApperClient not available')
    }

    const params = {
      fields: [
        {"field": {"Name": "Name"}},
        {"field": {"Name": "Tags"}},
        {"field": {"Name": "title_c"}},
        {"field": {"Name": "description_c"}},
        {"field": {"Name": "priority_c"}},
        {"field": {"Name": "dueDate_c"}},
        {"field": {"Name": "completed_c"}},
        {"field": {"Name": "CreatedOn"}},
        {"field": {"Name": "ModifiedOn"}}
      ]
    }

    const response = await apperClient.getRecordById(TABLE_NAME, id, params)

    if (!response.success) {
      console.error(response.message)
      return null
    }

    const task = response.data
    if (!task) return null

    // Transform data to match UI expectations
    return {
      id: task.Id,
      title: task.title_c || '',
      description: task.description_c || '',
      priority: task.priority_c || 'medium',
      dueDate: task.dueDate_c || null,
      completed: task.completed_c || false,
      createdAt: task.CreatedOn,
      completedAt: task.completed_c ? task.ModifiedOn : null,
      tags: task.Tags || '',
      name: task.Name || ''
    }
  } catch (error) {
    console.error(`Error fetching task ${id}:`, error?.response?.data?.message || error)
    return null
  }
}

// Create new task
const create = async (taskData) => {
  try {
    const apperClient = getApperClient()
    if (!apperClient) {
      throw new Error('ApperClient not available')
    }

    // Map UI fields to database fields (only Updateable fields)
    const dbRecord = {
      Name: taskData.title || 'Untitled Task',
      title_c: taskData.title || '',
      description_c: taskData.description || '',
      priority_c: taskData.priority || 'medium',
      dueDate_c: taskData.dueDate || null,
      completed_c: false
    }

    const params = {
      records: [dbRecord]
    }

    const response = await apperClient.createRecord(TABLE_NAME, params)

    if (!response.success) {
      console.error(response.message)
      throw new Error(response.message)
    }

    if (response.results) {
      const failed = response.results.filter(r => !r.success)
      if (failed.length > 0) {
        console.error(`Failed to create task:`, failed)
        throw new Error(failed[0].message || 'Failed to create task')
      }
      
      const created = response.results.find(r => r.success)?.data
      if (created) {
        // Return in UI format
        return {
          id: created.Id,
          title: created.title_c || '',
          description: created.description_c || '',
          priority: created.priority_c || 'medium',
          dueDate: created.dueDate_c || null,
          completed: created.completed_c || false,
          createdAt: created.CreatedOn,
          completedAt: null,
          tags: created.Tags || '',
          name: created.Name || ''
        }
      }
    }

    throw new Error('No data returned from create operation')
  } catch (error) {
    console.error("Error creating task:", error?.response?.data?.message || error)
    throw error
  }
}

// Update task
const update = async (id, updateData) => {
  try {
    const apperClient = getApperClient()
    if (!apperClient) {
      throw new Error('ApperClient not available')
    }

    // Map UI fields to database fields (only Updateable fields)
    const dbRecord = {
      Id: parseInt(id)
    }

    // Only include fields that have values
    if (updateData.title !== undefined) {
      dbRecord.Name = updateData.title
      dbRecord.title_c = updateData.title
    }
    if (updateData.description !== undefined) {
      dbRecord.description_c = updateData.description
    }
    if (updateData.priority !== undefined) {
      dbRecord.priority_c = updateData.priority
    }
    if (updateData.dueDate !== undefined) {
      dbRecord.dueDate_c = updateData.dueDate
    }
    if (updateData.completed !== undefined) {
      dbRecord.completed_c = updateData.completed
    }

    const params = {
      records: [dbRecord]
    }

    const response = await apperClient.updateRecord(TABLE_NAME, params)

    if (!response.success) {
      console.error(response.message)
      throw new Error(response.message)
    }

    if (response.results) {
      const failed = response.results.filter(r => !r.success)
      if (failed.length > 0) {
        console.error(`Failed to update task:`, failed)
        throw new Error(failed[0].message || 'Failed to update task')
      }
      
      const updated = response.results.find(r => r.success)?.data
      if (updated) {
        // Return in UI format
        return {
          id: updated.Id,
          title: updated.title_c || '',
          description: updated.description_c || '',
          priority: updated.priority_c || 'medium',
          dueDate: updated.dueDate_c || null,
          completed: updated.completed_c || false,
          createdAt: updated.CreatedOn,
          completedAt: updated.completed_c ? updated.ModifiedOn : null,
          tags: updated.Tags || '',
          name: updated.Name || ''
        }
      }
    }

    throw new Error('No data returned from update operation')
  } catch (error) {
    console.error("Error updating task:", error?.response?.data?.message || error)
    throw error
  }
}

// Delete task
const deleteTask = async (id) => {
  try {
    const apperClient = getApperClient()
    if (!apperClient) {
      throw new Error('ApperClient not available')
    }

    const params = {
      RecordIds: [parseInt(id)]
    }

    const response = await apperClient.deleteRecord(TABLE_NAME, params)

    if (!response.success) {
      console.error(response.message)
      throw new Error(response.message)
    }

    if (response.results) {
      const failed = response.results.filter(r => !r.success)
      if (failed.length > 0) {
        console.error(`Failed to delete task:`, failed)
        throw new Error(failed[0].message || 'Failed to delete task')
      }
    }

    return { success: true }
  } catch (error) {
    console.error("Error deleting task:", error?.response?.data?.message || error)
    throw error
  }
}

// Toggle task completion
const toggleComplete = async (id) => {
  try {
    // First get current task state
    const currentTask = await getById(id)
    if (!currentTask) {
      throw new Error("Task not found")
    }

    // Update with opposite completion state
    return await update(id, { 
      completed: !currentTask.completed 
    })
  } catch (error) {
    console.error("Error toggling task completion:", error?.response?.data?.message || error)
    throw error
  }
}

export const taskService = {
  getAll,
  getById,
  create,
  update,
  delete: deleteTask,
  toggleComplete
}