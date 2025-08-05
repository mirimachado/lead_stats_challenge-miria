// src/tasks/dto/create-task.dto.ts
export class CreateTaskDto {
  title: string;
  description?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  dueDate?: string;
  estimatedHours?: number;
}
