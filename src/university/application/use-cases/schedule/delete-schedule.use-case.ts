import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { ScheduleRepository } from 'src/university/domain/repositories/schedule.repository';

@Injectable()
export class DeleteScheduleUseCase {
  constructor(
    @Inject('ScheduleRepository')
    private readonly scheduleRepo: ScheduleRepository,
  ) {}

  async execute(id: string, userId: string): Promise<void> {
    if (!id) {
      throw new BadRequestException('Schedule ID is required');
    }
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }

    const exist = await this.scheduleRepo.findScheduleById(id, userId);

    if (!exist) {
      throw new NotFoundException('Schedule not found');
    }

    await this.scheduleRepo.deleteSchedule(id, userId);
  }
}
