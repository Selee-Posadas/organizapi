import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { TaskRepository } from 'src/task/domain/repositories/task.repository';

@Injectable()
export class DeleteTaskUseCase {
  constructor(
    @Inject('TaskRepository') private readonly taskRepo: TaskRepository,
  ) {}

  async execute(id: string, userId: string): Promise<void> {
    if (!id) {
      throw new BadRequestException('Task ID is required');
    }
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }

    const task = await this.taskRepo.findTaskById(id, userId);

    if (!task) throw new NotFoundException('Task ID not found');

    await this.taskRepo.deleteTask(id, userId);
  }
}
