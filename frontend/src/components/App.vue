<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto p-6 space-y-8">
      <!-- Header -->
      <header class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Task Management Dashboard</h1>
      </header>

      <!-- Task Summary Cards -->
      <TaskSummary />

      <!-- Chart Section -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <TaskChart />
      </div>

      <!-- Tasks Section -->
      <div class="bg-white rounded-lg shadow-md">
        <TaskTable />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TaskSummary from '@/components/TaskSummary.vue'
import TaskChart from '@/components/TaskChart.vue'
import TaskTable from '@/components/TaskTable.vue'
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>