<script setup lang="ts">
import { ref } from 'vue';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { createTask } from '@/api/tasks';
import { Button } from 'primevue/button';
import { InputText } from 'primevue/inputtext';
import { Dropdown } from 'primevue/dropdown';

const title = ref('');
const description = ref('');
const priority = ref('LOW');
const assignedTo = ref('');
const dueDate = ref('');
const estimatedHours = ref<number | null>(null);

const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: createTask,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['tasks'] });
    resetForm();
  },
});

const priorities = ['LOW', 'MEDIUM', 'HIGH'];

function submit() {
  if (!title.value) return;
  mutation.mutate({
    title: title.value,
    description: description.value,
    priority: priority.value,
    status: 'TODO',
    assignedTo: assignedTo.value,
    dueDate: dueDate.value ? new Date(dueDate.value).toISOString() : null,
    tags: [],
    estimatedHours: estimatedHours.value ?? undefined,
  });
}

function resetForm() {
  title.value = '';
  description.value = '';
  priority.value = 'LOW';
  assignedTo.value = '';
  dueDate.value = '';
  estimatedHours.value = null;
}
</script>

<template>
  <div class="space-y-4 p-4 border rounded-xl shadow bg-white">
    <h2 class="text-lg font-semibold">Create a new task</h2>

    <div class="grid md:grid-cols-2 gap-4">
      <div>
        <label class="block mb-1 font-medium">Title</label>
        <InputText v-model="title" class="w-full" />
      </div>
      <div>
        <label class="block mb-1 font-medium">Assigned To</label>
        <InputText v-model="assignedTo" class="w-full" />
      </div>
      <div>
        <label class="block mb-1 font-medium">Priority</label>
        <Dropdown v-model="priority" :options="priorities" class="w-full" />
      </div>
      <div>
        <label class="block mb-1 font-medium">Due Date</label>
        <InputText v-model="dueDate" type="date" class="w-full" />
      </div>
      <div class="md:col-span-2">
        <label class="block mb-1 font-medium">Description</label>
        <InputText v-model="description" class="w-full" />
      </div>
      <div>
        <label class="block mb-1 font-medium">Estimated Hours</label>
        <InputText v-model="estimatedHours" type="number" class="w-full" />
      </div>
    </div>

    <Button label="Create Task" @click="submit" />
  </div>
</template>