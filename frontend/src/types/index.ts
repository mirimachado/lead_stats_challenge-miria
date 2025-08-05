export interface Task {
    id?: string
    title: string
    description: string
    priority: 'LOW' | 'MEDIUM' | 'HIGH'
    status: 'TODO' | 'IN_PROGRESS' | 'DONE'
    createdAt?: string
    dueDate?: string | Date | null
    assignedTo: string
    tags: string[]
    estimatedHours?: number | null
  }
  
  export interface CreateTaskDto {
    title: string
    description: string
    priority: 'LOW' | 'MEDIUM' | 'HIGH'
    status: 'TODO' | 'IN_PROGRESS' | 'DONE'
    assignedTo: string
    tags: string[]
    estimatedHours?: number | null
    dueDate?: string | null
  }
  
  export interface UpdateTaskDto extends Partial<CreateTaskDto> {}
  
  export interface TaskFilters {
    priority?: string | null
    dateRange?: Date[] | null
    status?: string | null
    assignedTo?: string | null
  }
  
  export interface TaskSummary {
    HIGH: number
    MEDIUM: number
    LOW: number
    total: number
  }
  
  export interface ChartData {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      borderColor: string
      backgroundColor?: string
      tension?: number
      fill?: boolean
    }[]
  }