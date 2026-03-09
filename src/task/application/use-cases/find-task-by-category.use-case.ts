import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Task } from 'src/task/domain/entities/task.entity';
import type { TaskRepository } from 'src/task/domain/repositories/task.repository';

@Injectable()
export class FindTasksByCategoryUseCase {
  constructor(
    @Inject('TaskRepository')
    private readonly taskRepo: TaskRepository,
  ) {}

  async execute(categoryId: string, userId: string): Promise<Task[]> {
    if (!categoryId) {
      throw new BadRequestException('Category ID is required');
    }
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }
    return await this.taskRepo.findTasksByCategory(categoryId, userId);
  }
}
