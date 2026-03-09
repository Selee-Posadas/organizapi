import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { Task } from 'src/task/domain/entities/task.entity';
import { TaskRepository } from 'src/task/domain/repositories/task.repository';
import { TaskMapper } from '../mappers/task.mapper';
import { TaskStatus } from 'src/task/domain/enum/task-status.enum';
import { TaskPriority } from 'src/task/domain/enum/task-priority.enum';
import { EnergyLevel } from 'src/task/domain/enum/task-energy.enum';

@Injectable()
export class PrismaTaskRepository implements TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(userId: string, data: Partial<Task>): Promise<Task> {
    const created = await this.prisma.task.create({
      data: {
        title: data.title!,
        description: data.description,
        status: TaskStatus.PENDING,
        priority: data.priority || TaskPriority.MEDIUM,
        energyRequired: data.energyRequired || EnergyLevel.MEDIUM,
        userId: userId,
        goalId: data.goalId,
        categoryId: data.categoryId,
        dueDate: data.dueDate,
        startTime: data.startTime,
        endTime: data.endTime,
      },
    });
    return TaskMapper.toDomain(created);
  }

  async findTaskById(id: string, userId: string): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({
      where: {
        id_userId: { id, userId },
      },
      include: { category: true },
    });

    return task ? TaskMapper.toDomain(task) : null;
  }

  async findAllTasksByUserId(userId: string): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: { userId },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
    return tasks.map(TaskMapper.toDomain);
  }

  async updateTask(
    id: string,
    userId: string,
    data: Partial<Task>,
  ): Promise<Task> {
    const updated = await this.prisma.task.update({
      where: { id_userId: { id, userId } },
      data: { ...data },
      include: { category: true },
    });
    return TaskMapper.toDomain(updated);
  }

  async deleteTask(id: string, userId: string): Promise<void> {
    await this.prisma.task.delete({
      where: { id_userId: { id, userId } },
    });
  }

  async findTasksByCategory(
    categoryId: string,
    userId: string,
  ): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: { categoryId, userId },
      include: { category: true },
    });
    return tasks.map(TaskMapper.toDomain);
  }

  async findTasksForDailyWidget(userId: string, date: Date): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: {
        userId,
        dueDate: date,
      },
      include: { category: true },
      orderBy: [{ priority: 'desc' }, { startTime: 'asc' }],
    });

    return tasks.map(TaskMapper.toDomain);
  }
}
