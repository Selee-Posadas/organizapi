import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import type { ScheduleRepository } from 'src/university/domain/repositories/schedule.repository';
import { ScheduleWithDetailsDto } from 'src/university/dto/schedule/schedule-with-details.dto';

@Injectable()
export class FindAllSchedulesWithDetailsUseCase {
  constructor(
    @Inject('ScheduleRepository')
    private readonly repo: ScheduleRepository,
  ) {}

  async execute(userId: string): Promise<ScheduleWithDetailsDto[]> {
    if (!userId) {
      throw new BadRequestException(
        'User authentication is required to fetch detailed schedules',
      );
    }

    return await this.repo.findAllSchedulesWithDetails(userId);
  }
}
