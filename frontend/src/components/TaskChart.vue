<template>
  <div>
    <h3 class="text-xl font-semibold mb-4 text-gray-800">Tasks By Creation Date</h3>
    <div class="h-80 relative">
      <div v-if="isLoading" class="flex items-center justify-center h-full">
        <div class="text-gray-500">Loading chart...</div>
      </div>
      <div v-else-if="!tasks || tasks.length === 0" class="flex items-center justify-center h-full">
        <div class="text-gray-500">No tasks found</div>
      </div>
      <canvas v-else ref="chartRef" class="w-full h-full"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick, onBeforeUnmount } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { useFilterStore } from '@/stores/taskFilter'
import { taskApi } from '@/api/tasks'

let Chart: any = null

const chartRef = ref<HTMLCanvasElement>()
const filterStore = useFilterStore()
let chartInstance: any = null

const { data: tasks, isLoading } = useQuery({
  queryKey: ['tasks'],
  queryFn: taskApi.getTasks
})

const loadChartJS = async () => {
  if (!Chart) {
    const chartModule = await import('chart.js/auto')
    Chart = chartModule.default
  }
}

const createChart = async () => {
  if (!chartRef.value || !tasks.value || !Chart) return

  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }

  const filteredTasks = tasks.value.filter((task: any) => {
    if (filterStore.priority && task.priority !== filterStore.priority) {
      return false
    }
    
    if (filterStore.dateRange && filterStore.dateRange.length === 2) {
      const taskDate = new Date(task.createdAt)
      const [startDate, endDate] = filterStore.dateRange
      if (taskDate < startDate || taskDate > endDate) {
        return false
      }
    }
    
    return true
  })

  const tasksByDate: Record<string, number> = {}
  
  filteredTasks.forEach((task: any) => {
    const date = new Date(task.createdAt).toLocaleDateString('pt-BR')
    tasksByDate[date] = (tasksByDate[date] || 0) + 1
  })

  const sortedDates = Object.keys(tasksByDate).sort((a, b) => {
    const dateA = a.split('/').reverse().join('-')
    const dateB = b.split('/').reverse().join('-')
    return new Date(dateA).getTime() - new Date(dateB).getTime()
  })

  if (sortedDates.length === 0) {
    const today = new Date().toLocaleDateString('pt-BR')
    sortedDates.push(today)
    tasksByDate[today] = 0
  }

  const chartData = {
    labels: sortedDates,
    datasets: [
      {
        label: 'Created Tasks',
        data: sortedDates.map(date => tasksByDate[date] || 0),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4
      }
    ]
  }

  const config = {
    type: 'line',
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: false
        },
        legend: {
          display: true,
          position: 'top' as const
        },
        tooltip: {
          mode: 'index' as const,
          intersect: false,
        }
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Tasks Amount'
          },
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      },
      interaction: {
        mode: 'nearest' as const,
        axis: 'x' as const,
        intersect: false
      }
    }
  }
  chartInstance = new Chart(chartRef.value, config)
}

onMounted(async () => {
  await loadChartJS()
  await nextTick()
  if (tasks.value) {
    createChart()
  }
})

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})

watch([tasks, () => filterStore.priority, () => filterStore.dateRange], async () => {
  if (Chart && tasks.value) {
    await nextTick()
    createChart()
  }
}, { deep: true })
</script>