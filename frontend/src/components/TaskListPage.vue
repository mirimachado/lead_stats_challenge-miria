<script setup lang="ts">
import TaskForm from '@/components/TaskForm.vue';
import TaskChart from '@/components/TaskChart.vue';
import TaskTable from '@/components/TaskTable.vue';
import { useTaskFilterStore } from '@/stores/taskFilter';
import Button from 'primevue/button';

const filterStore = useTaskFilterStore();

const setFilter = (priority: string | null) => {
  filterStore.setPriority(priority);
};
</script>

<template>
  <main class="p-6 space-y-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="p-4 rounded-lg bg-red-100 text-red-800 font-bold text-center cursor-pointer" @click="setFilter('HIGH')">
        High Priority
      </div>
      <div class="p-4 rounded-lg bg-yellow-100 text-yellow-800 font-bold text-center cursor-pointer" @click="setFilter('MEDIUM')">
        Medium Priority
      </div>
      <div class="p-4 rounded-lg bg-green-100 text-green-800 font-bold text-center cursor-pointer" @click="setFilter('LOW')">
        Low Priority
      </div>
    </div>

    <TaskChart />
    <TaskForm />
    <TaskTable />
  </main>
</template>