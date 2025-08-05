export const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return '-'
    
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    } catch (error) {
      return '-'
    }
  }
  
  export const formatDateTime = (dateString: string | null | undefined): string => {
    if (!dateString) return '-'
    
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch (error) {
      return '-'
    }
  }
  
  export const isDateInRange = (date: string, startDate?: Date, endDate?: Date): boolean => {
    if (!startDate || !endDate) return true
    
    const targetDate = new Date(date)
    return targetDate >= startDate && targetDate <= endDate
  }
  
  export const groupTasksByDate = (tasks: any[]): Record<string, number> => {
    const groups: Record<string, number> = {}
    
    tasks.forEach(task => {
      const date = formatDate(task.createdAt)
      groups[date] = (groups[date] || 0) + 1
    })
    
    return groups;
  }