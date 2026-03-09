import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Task } from 'src/task/domain/entities/task.entity';
import type { TaskRepository } from 'src/task/domain/repositories/task.repository';

@Injectable()
export class FindAllTasksUseCase {
  constructor(
    @Inject('TaskRepository')
    private readonly taskRepo: TaskRepository,
  ) {}

  async execute(userId: string): Promise<Task[]> {
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }
    return await this.taskRepo.findAllTasksByUserId(userId);
  }
}
