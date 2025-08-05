<template>
  <main class="p-6 max-w-screen-xl mx-auto space-y-6">
    <SummaryCards />
    <TaskChart />
    <TaskTable />
  </main>
</template>

<script setup lang="ts">
import SummaryCards from '@/components/SummaryCards.vue';
import TaskChart from '@/components/TaskChart.vue';
import TaskTable from '@/components/TaskTable.vue';
</script>




