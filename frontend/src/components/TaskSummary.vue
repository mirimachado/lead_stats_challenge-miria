<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div
      v-for="priority in priorities"
      :key="priority.level"
      class="bg-white rounded-lg shadow-md p-6 border-l-4 hover:shadow-lg transition-shadow cursor-pointer"
      :class="priority.borderColor"
      @click="() => filterStore.setPriority(priority.level)"
    >
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">{{ priority.label }}</p>
          <p class="text-3xl font-bold" :class="priority.textColor">
            {{ getTaskCount(priority.level) }}
          </p>
        </div>
        <div class="p-3 rounded-full" :class="priority.bgColor">
          <i class="pi pi-flag text-xl" :class="priority.iconColor"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { useFilterStore } from '@/stores/taskFilter'
import { taskApi } from '@/api/tasks'

const filterStore = useFilterStore()

const { data: tasks, isLoading } = useQuery({
  queryKey: ['tasks'],
  queryFn: taskApi.getTasks
})

const priorities = [
  {
    level: 'HIGH',
    label: 'High Priority',
    borderColor: 'border-red-500',
    textColor: 'text-red-600',
    bgColor: 'bg-red-100',
    iconColor: 'text-red-500'
  },
  {
    level: 'MEDIUM',
    label: 'Medium Priority',
    borderColor: 'border-yellow-500',
    textColor: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-500'
  },
  {
    level: 'LOW',
    label: 'Low Priority',
    borderColor: 'border-green-500',
    textColor: 'text-green-600',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-500'
  }
]

const getTaskCount = (priority: string) => {
  if (isLoading.value || !tasks.value) return 0
  return tasks.value.filter((task: any) => task.priority === priority).length
}
</script>