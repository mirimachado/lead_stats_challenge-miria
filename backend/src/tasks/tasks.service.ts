import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { db } from '../db';
import { tasks } from '../db/schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
  async create(task: any) {
    try {
      const newTask = {
        ...task,
        id: uuidv4(),
        createdAt: new Date(),
        dueDate: task.dueDate ? new Date(task.dueDate) : null,
        tags: task.tags ?? [],
      };

      await db.insert(tasks).values(newTask);
      return newTask;
    } catch (error) {
      console.error('Erro ao criar task:', error);
      throw error;
    }
  }

  async findAll() {
    return db.select().from(tasks);
  }

  async findOne(id: string) {
    const [task] = await db.select().from(tasks).where(eq(tasks.id, id));
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, dto: UpdateTaskDto) {
    try {
      const updatedDto = {
        ...dto,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
        estimatedHours: dto.estimatedHours != null ? String(dto.estimatedHours) : null,
      };
      
      await db.update(tasks).set(updatedDto).where(eq(tasks.id, id));
      return { id, ...updatedDto };
    } catch (error) {
      console.error('Erro ao atualizar task:', error);
      throw new InternalServerErrorException('Erro ao atualizar task');
    }
  }

  async remove(id: string) {
    const [deleted] = await db
      .delete(tasks)
      .where(eq(tasks.id, id))
      .returning();
    if (!deleted) throw new NotFoundException('Task not found');
    return deleted;
  }
}
