<template>
  <div class="p-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <h2 class="text-2xl font-semibold text-gray-800">Tasks</h2>
      <Button
        label="New Task"
        icon="pi pi-plus"
        class="p-button-success"
        @click="openNewTask"
      />
    </div>

    <div class="flex flex-col sm:flex-row gap-4 mb-6">
      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-700 mb-2">Filter By Priority</label>
        <Dropdown
          v-model="filterStore.priority"
          :options="priorityOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="All priorities"
          class="w-full"
          showClear
        />
      </div>
      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-700 mb-2">Filter By Date</label>
        <Calendar
          v-model="dateRange"
          selectionMode="range"
          dateFormat="dd/mm/yy"
          placeholder="Select the period"
          class="w-full"
          showIcon
          @update:modelValue="updateDateRange"
        />
      </div>
    </div>

    <DataTable
      :value="filteredTasks"
      :loading="isLoading"
      paginator
      :rows="10"
      :rowsPerPageOptions="[5, 10, 20]"
      class="p-datatable-striped"
      responsiveLayout="stack"
      breakpoint="768px"
      emptyMessage="No tasks found"
    >
      <Column field="title" header="Title" :sortable="true">
        <template #body="{ data }">
          <span class="font-medium">{{ data.title }}</span>
        </template>
      </Column>
      
      <Column field="description" header="Description">
        <template #body="{ data }">
          <span class="text-gray-600">
            {{ data.description?.substring(0, 50) }}{{ data.description?.length > 50 ? '...' : '' }}
          </span>
        </template>
      </Column>
      
      <Column field="priority" header="Priority" :sortable="true">
        <template #body="{ data }">
          <Badge
            :value="getPriorityLabel(data.priority)"
            :severity="getPrioritySeverity(data.priority)"
          />
        </template>
      </Column>
      
      <Column field="status" header="Status" :sortable="true">
        <template #body="{ data }">
          <Badge
            :value="getStatusLabel(data.status)"
            :severity="getStatusSeverity(data.status)"
          />
        </template>
      </Column>
      
      <Column field="assignedTo" header="Assigned To">
        <template #body="{ data }">
          <span class="text-gray-700">{{ data.assignedTo || '-' }}</span>
        </template>
      </Column>
      
      <Column field="createdAt" header="Created At" :sortable="true">
        <template #body="{ data }">
          <span class="text-sm text-gray-500">
            {{ formatDate(data.createdAt) }}
          </span>
        </template>
      </Column>
      
      <Column field="dueDate" header="Due Date" :sortable="true">
        <template #body="{ data }">
          <span class="text-sm text-gray-500">
            {{ data.dueDate ? formatDate(data.dueDate) : '-' }}
          </span>
        </template>
      </Column>
      
      <Column header="Actions" :exportable="false">
        <template #body="{ data }">
          <div class="flex gap-2">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-text p-button-sm"
              @click="editTask(data)"
              v-tooltip="'Edit'"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-text p-button-sm p-button-danger"
              @click="confirmDelete(data)"
              v-tooltip="'Delete'"
            />
          </div>
        </template>
      </Column>
    </DataTable>

    <EditTaskDialog
      v-model:visible="showTaskDialog"
      :task-to-edit="selectedTask"
      @task-saved="onTaskSaved"
    />

    <ConfirmDialog />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { useFilterStore } from '@/stores/taskFilter'
import { useConfirm } from 'primevue/useconfirm'
import { taskApi } from '@/api/tasks'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import Calendar from 'primevue/calendar'
import Badge from 'primevue/badge'
import ConfirmDialog from 'primevue/confirmdialog'
import EditTaskDialog from './EditTaskDialog.vue'
import moment from 'moment';

const filterStore = useFilterStore()
const confirm = useConfirm()
const queryClient = useQueryClient()

const showTaskDialog = ref(false)
const selectedTask = ref(null)
const dateRange = ref()

const priorityOptions = [
  { label: 'All', value: null },
  { label: 'High', value: 'HIGH' },
  { label: 'Medium', value: 'MEDIUM' },
  { label: 'Low', value: 'LOW' }
]

const { data: tasks, isLoading } = useQuery({
  queryKey: ['tasks'],
  queryFn: taskApi.getTasks
})

const deleteMutation = useMutation({
  mutationFn: taskApi.deleteTask,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['tasks'] })
  },
})

// Tarefas filtradas
const filteredTasks = computed(() => {
  if (!tasks.value) return []
  
  return tasks.value.filter((task: any) => {
    if (filterStore.priority && task.priority !== filterStore.priority) {
      return false
    }
    
    if (filterStore.dateRange && filterStore.dateRange.length === 2) {
      const taskDate = new Date(task.createdAt.substring(0, 10));
  
      const [startDate, endDate] = filterStore.dateRange
      
      if (taskDate < startDate || taskDate > endDate) {
        return false
      }
    }
    
    return true
  })
})

const formatDate = (dateString: string) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('pt-EN')
}

const getPriorityLabel = (priority: string) => {
  const labels = {
    HIGH: 'High',
    MEDIUM: 'Medium',
    LOW: 'Low'
  }
  return labels[priority as keyof typeof labels] || priority
}

const getPrioritySeverity = (priority: string) => {
  const severities = {
    HIGH: 'danger',
    MEDIUM: 'warning',
    LOW: 'success'
  }
  return severities[priority as keyof typeof severities] || 'info'
}

const getStatusLabel = (status: string) => {
  const labels = {
    TODO: 'To Do',
    IN_PROGRESS: 'In Progress',
    DONE: 'Done'
  }
  return labels[status as keyof typeof labels] || status
}

const getStatusSeverity = (status: string) => {
  const severities = {
    TODO: 'secondary',
    IN_PROGRESS: 'warning',
    DONE: 'success'
  }
  return severities[status as keyof typeof severities] || 'info'
}

// Handlers
const openNewTask = () => {
  selectedTask.value = null
  showTaskDialog.value = true
}

const editTask = (task: any) => {
  selectedTask.value = task
  showTaskDialog.value = true
}

const confirmDelete = (task: any) => {
  confirm.require({
    message: `Are you sure that you want to delete the task "${task.title}"?`,
    header: 'Confirm Deletion',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      deleteMutation.mutate(task.id)
    }
  })
}

const onTaskSaved = () => {
  showTaskDialog.value = false
  selectedTask.value = null
  queryClient.invalidateQueries({ queryKey: ['tasks'] })
}

const updateDateRange = (value: Date[] | null) => {
  filterStore.setDateRange(value)
}

// Watchers
watch(dateRange, (newValue) => {
  updateDateRange(newValue)
})
</script>
