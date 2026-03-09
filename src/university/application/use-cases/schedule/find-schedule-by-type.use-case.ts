import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import type { ScheduleRepository } from 'src/university/domain/repositories/schedule.repository';
import { Schedule } from 'src/university/domain/entities/schedule.entity';
import { ScheduleType } from 'src/university/domain/enums/schedule-type.enum';

@Injectable()
export class FindScheduleByTypeUseCase {
  constructor(
    @Inject('ScheduleRepository')
    private readonly repo: ScheduleRepository,
  ) {}

  async execute(type: ScheduleType, userId: string): Promise<Schedule[]> {
    if (!type) {
      throw new BadRequestException('Schedule type is required');
    }
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }

    return await this.repo.findSchedulesByType(type, userId);
  }
}
