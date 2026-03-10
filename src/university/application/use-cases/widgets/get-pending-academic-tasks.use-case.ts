import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { EnergyLevel } from 'src/task/domain/enum/task-energy.enum';
import { Task } from 'src/task/domain/entities/task.entity';
import type { TaskRepository } from 'src/task/domain/repositories/task.repository';
import { TaskStatus } from 'src/task/domain/enum/task-status.enum';

@Injectable()
export class GetPendingAcademicTasksUseCase {
  constructor(
    @Inject('TaskRepository') private readonly taskRepo: TaskRepository,
  ) {}

  async execute(
    userId: string,
    energyRequired?: EnergyLevel,
  ): Promise<Task[]> {
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }

    const allTasks = await this.taskRepo.findAllTasksByUserId(userId);

    return allTasks.filter((task) => {
      const hasEnrollment = !!task.enrollmentId;
      const isPending = task.status === TaskStatus.PENDING;
      const matchesEnergy = !energyRequired || task.energyRequired === energyRequired;

      return hasEnrollment && isPending && matchesEnergy;
    });
  }
}
