import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DayOfWeek } from 'src/university/domain/enums/day-of-week.enum';
import type { ScheduleRepository } from 'src/university/domain/repositories/schedule.repository';
import { ScheduleWithDetailsDto } from 'src/university/dto/schedule/schedule-with-details.dto';

@Injectable()
export class GetTodayClassesUseCase {
  constructor(
    @Inject('ScheduleRepository') private readonly scheduleRepo: ScheduleRepository,
  ) {}

  async execute(userId: string): Promise<ScheduleWithDetailsDto[]> {
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }

    const todayJS = new Date().getDay();
    const dayForRepo =
      todayJS === 0 ? DayOfWeek.SUNDAY : (todayJS as DayOfWeek);

    return await this.scheduleRepo.findSchedulesByDayWithDetails(dayForRepo, userId);
  }
}
