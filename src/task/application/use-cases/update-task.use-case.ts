import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Task } from 'src/task/domain/entities/task.entity';
import type { TaskRepository } from 'src/task/domain/repositories/task.repository';
import { UpdateTaskDto } from 'src/task/dto/update-task.dto';

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    @Inject('TaskRepository') private readonly taskRepo: TaskRepository,
  ) {}

  async execute(id: string, userId: string, dto: UpdateTaskDto): Promise<Task> {
    if (!id) {
      throw new BadRequestException('Task ID is required');
    }
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }
    if (!dto) {
      throw new BadRequestException('Task data is required');
    }
    const task = await this.taskRepo.findTaskById(id, userId);

    if (!task) throw new NotFoundException('Task is not found');

    return await this.taskRepo.updateTask(id, userId, dto);
  }
}
