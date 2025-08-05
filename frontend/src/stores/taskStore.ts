// src/stores/taskStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Task } from '@/types';

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref<Task[]>([]);

  function setTasks(newTasks: Task[]) {
    tasks.value = newTasks;
  }

  function addTask(task: Task) {
    tasks.value.push(task);
  }

  function updateTask(updatedTask: Task) {
    const index = tasks.value.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      tasks.value[index] = updatedTask;
    }
  }

  function deleteTask(id: string) {
    tasks.value = tasks.value.filter(t => t.id !== id);
  }

  return {
    tasks,
    setTasks,
    addTask,
    updateTask,
    deleteTask,
  };
});
