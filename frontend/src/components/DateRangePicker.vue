<template>
  <div class="flex items-center gap-2">
    <Calendar v-model="dates" selectionMode="range" dateFormat="yy-mm-dd" @update:modelValue="emitDates" showIcon />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import Calendar from 'primevue/calendar';

const store = useTaskStore();
const dates = ref<[Date, Date] | null>(null);

function emitDates(value: [Date, Date] | null) {
  if (value && value[0] && value[1]) {
    store.setDateRange(value);
  }
}
</script>
