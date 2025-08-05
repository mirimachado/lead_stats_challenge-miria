<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div v-for="priority in priorities" :key="priority" class="p-4 rounded-xl shadow bg-white flex flex-col items-center">
      <div class="text-xl font-semibold">{{ priority }}</div>
      <div class="text-3xl font-bold">{{ getCount(priority) }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';

const priorities = ['HIGH', 'MEDIUM', 'LOW'];

const { data: tasks } = useQuery({
  queryKey: ['tasks'],
  queryFn: async () => {
    const res = await fetch('http://localhost:3000/tasks');
    return res.json();
  },
});

function getCount(priority: string) {
  return tasks.value?.filter((t: any) => t.priority === priority).length || 0;
}
</script>
