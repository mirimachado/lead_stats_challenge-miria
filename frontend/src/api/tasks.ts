import type { Task, CreateTaskDto, UpdateTaskDto } from '@/types'

const API_BASE_URL = 'http://localhost:3000'

export const taskApi = {
  async getTasks(): Promise<Task[]> {
    const response = await fetch(`${API_BASE_URL}/tasks`)
    if (!response.ok) {
      throw new Error(`Error searching tasks: ${response.status}`)
    }
    return response.json()
  },

  async getTask(id: string): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`)
    if (!response.ok) {
      throw new Error(`Error searching: ${response.status}`)
    }
    return response.json()
  },

  async createTask(taskData: CreateTaskDto): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Error creating task: ${response.status} - ${errorText}`)
    }

    const result = await response.json()
    return result
  },

  async updateTask(id: string, taskData: UpdateTaskDto): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Error updating task: ${response.status} - ${errorText}`)
    }

    const result = await response.json()
    return result
  },

  async deleteTask(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Error deleting task: ${response.status} - ${errorText}`)
    }
  }
}