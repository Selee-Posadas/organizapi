import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Task } from 'src/task/domain/entities/task.entity';
import type { TaskRepository } from 'src/task/domain/repositories/task.repository';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject('TaskRepository') private readonly taskRepo: TaskRepository,
  ) {}

  async execute(dto: CreateTaskDto, userId: string): Promise<Task> {
    if (!dto) {
      throw new BadRequestException('Task data is required');
    }
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }
    const taskData: Partial<Task> = {
      ...dto,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
    };

    return await this.taskRepo.createTask(userId, taskData);
  }
}
