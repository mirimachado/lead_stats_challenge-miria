<template>
  <Dialog
    v-model:visible="internalVisible"
    modal
    :header="taskToEdit ? 'Edit Task' : 'New Task'"
    :style="{ width: '50rem' }"
    class="p-fluid"
    @hide="handleClose"
  >
    <form @submit.prevent="saveTask">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div class="md:col-span-2">
          <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <InputText
            id="title"
            v-model="task.title"
            required
            autofocus
            :class="{ 'p-invalid': !task.title && showValidation }"
          />
          <small v-if="!task.title && showValidation" class="p-error">
            Title is required
          </small>
        </div>

        <div class="md:col-span-2">
          <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <Textarea
            id="description"
            v-model="task.description"
            rows="3"
            placeholder="Describe the task..."
          />
        </div>

        <div>
          <label for="priority" class="block text-sm font-medium text-gray-700 mb-2">
            Priority *
          </label>
          <Dropdown
            id="priority"
            v-model="task.priority"
            :options="priorityOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Select the priority"
          />
        </div>

        <div>
          <label for="status" class="block text-sm font-medium text-gray-700 mb-2">
            Status *
          </label>
          <Dropdown
            id="status"
            v-model="task.status"
            :options="statusOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Select the status"
          />
        </div>

        <div>
          <label for="dueDate" class="block text-sm font-medium text-gray-700 mb-2">
            Due Date
          </label>
          <Calendar
            id="dueDate"
            v-model="task.dueDate"
            showIcon
            dateFormat="dd/mm/yy"
            placeholder="Select the date"
          />
        </div>

        <div>
          <label for="assignedTo" class="block text-sm font-medium text-gray-700 mb-2">
            Assigned To
          </label>
          <InputText
            id="assignedTo"
            v-model="task.assignedTo"
            placeholder="Assigned To"
          />
        </div>

        <div>
          <label for="estimatedHours" class="block text-sm font-medium text-gray-700 mb-2">
            Estimated Hours
          </label>
          <InputNumber
            id="estimatedHours"
            v-model="task.estimatedHours"
            :min="0"
            :max="999"
            suffix=" h"
            placeholder="0"
          />
        </div>

        <div>
          <label for="tags" class="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <Chips
            id="tags"
            v-model="task.tags"
            placeholder="Add tags..."
          />
        </div>
      </div>
    </form>

    <template #footer>
      <div class="flex justify-end gap-2">
        <Button
          label="Cancel"
          icon="pi pi-times"
          text
          @click="handleClose"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          :loading="mutation.isPending?.value"
          @click="saveTask"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { taskApi } from '@/api/tasks'
// import { useToast } from 'primevue/usetoast'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Dropdown from 'primevue/dropdown'
import Calendar from 'primevue/calendar'
import InputNumber from 'primevue/inputnumber'
import Chips from 'primevue/chips'
import Button from 'primevue/button'

interface Task {
  id?: string
  title: string
  description: string
  priority: string
  status: string
  dueDate?: Date | null
  assignedTo: string
  tags: string[]
  estimatedHours?: number | null
  createdAt?: string
}

const props = defineProps<{
  visible: boolean
  taskToEdit?: Task | null
}>()

const emit = defineEmits<{
  'update:visible': [value: boolean]
  'task-saved': []
}>()

// const toast = useToast()
const queryClient = useQueryClient()

const internalVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val)
})

const showValidation = ref(false)

const priorityOptions = [
  { label: 'Low', value: 'LOW' },
  { label: 'Medium', value: 'MEDIUM' },
  { label: 'High', value: 'HIGH' }
]

const statusOptions = [
  { label: 'To Do', value: 'TODO' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Done', value: 'DONE' }
]

const task = ref<Task>({
  title: '',
  description: '',
  priority: 'LOW',
  status: 'TODO',
  dueDate: null,
  assignedTo: '',
  tags: [],
  estimatedHours: null
})

const mutation = useMutation({
  mutationFn: async (taskData: Task) => {
    const payload = {
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      status: taskData.status,
      assignedTo: taskData.assignedTo || '',
      tags: taskData.tags || [],
      estimatedHours: taskData.estimatedHours || null,
      dueDate: taskData.dueDate ? new Date(taskData.dueDate).toISOString() : null
    }

    if (taskData.id) {
      return await taskApi.updateTask(taskData.id, payload)
    } else {
      return await taskApi.createTask(payload)
    }
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['tasks'] })
    emit('task-saved')
  },
})

watch(
  () => props.visible,
  (visible) => {
    if (visible) {
      showValidation.value = false
      if (props.taskToEdit) {
        task.value = {
          id: props.taskToEdit.id,
          title: props.taskToEdit.title || '',
          description: props.taskToEdit.description || '',
          priority: props.taskToEdit.priority || 'LOW',
          status: props.taskToEdit.status || 'TODO',
          assignedTo: props.taskToEdit.assignedTo || '',
          tags: Array.isArray(props.taskToEdit.tags) ? [...props.taskToEdit.tags] : [],
          estimatedHours: props.taskToEdit.estimatedHours || null,
          dueDate: props.taskToEdit.dueDate ? new Date(props.taskToEdit.dueDate) : null
        }
      } else {
        task.value = {
          title: '',
          description: '',
          priority: 'LOW',
          status: 'TODO',
          dueDate: null,
          assignedTo: '',
          tags: [],
          estimatedHours: null
        }
      }
    }
  },
  { immediate: true }
)

const handleClose = () => {
  emit('update:visible', false)
}

const saveTask = async () => {
  showValidation.value = true
  
  if (!task.value.title?.trim()) {
    return
  }

  try {
    await mutation.mutateAsync(task.value)
  } catch (error) {
  }
}
</script>