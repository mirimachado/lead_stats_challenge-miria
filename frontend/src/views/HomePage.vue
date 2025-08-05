<!-- src/views/HomePage.vue -->
<template>
  <div class="p-4 space-y-6">
    <SummaryCards />
    <TaskChart />
    <TaskTable />
  </div>
</template>

<script setup lang="ts">
import SummaryCards from '@/components/SummaryCards.vue';
import TaskChart from '@/components/TaskChart.vue';
import TaskTable from '@/components/TaskTable.vue';
</script>
