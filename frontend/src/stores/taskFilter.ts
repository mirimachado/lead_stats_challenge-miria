import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFilterStore = defineStore('taskFilter', () => {
  const priority = ref<string | null>(null)
  const dateRange = ref<Date[] | null>(null)

  const setPriority = (newPriority: string | null) => {
    priority.value = newPriority
  }

  const setDateRange = (newDateRange: Date[] | null) => {
    dateRange.value = newDateRange
  }

  const clearFilters = () => {
    priority.value = null
    dateRange.value = null
  }

  return {
    priority,
    dateRange,
    setPriority,
    setDateRange,
    clearFilters
  }
})

// Alias para compatibilidade
export const useTaskFilterStore = useFilterStore
