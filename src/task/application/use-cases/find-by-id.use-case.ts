import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Task } from 'src/task/domain/entities/task.entity';
import type { TaskRepository } from 'src/task/domain/repositories/task.repository';

@Injectable()
export class FindTaskByIdUseCase {
  constructor(
    @Inject('TaskRepository')
    private readonly taskRepo: TaskRepository,
  ) {}

  async execute(id: string, userId: string): Promise<Task> {
    if (!id) {
      throw new BadRequestException('Task ID is required');
    }
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }
    const task = await this.taskRepo.findTaskById(id, userId);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }
}
