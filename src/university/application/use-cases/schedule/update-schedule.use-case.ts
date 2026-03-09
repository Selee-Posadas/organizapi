import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { ScheduleRepository } from 'src/university/domain/repositories/schedule.repository';
import { UpdateScheduleDto } from '../../../dto/schedule/update-schedule.dto';
import { Schedule } from 'src/university/domain/entities/schedule.entity';

@Injectable()
export class UpdateScheduleUseCase {
  constructor(
    @Inject('ScheduleRepository')
    private readonly repo: ScheduleRepository,
  ) {}

  async execute(
    id: string,
    userId: string,
    dto: UpdateScheduleDto,
  ): Promise<Schedule> {
    if (!id) {
      throw new BadRequestException('Schedule ID is required');
    }
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }
    if (!dto) {
      throw new BadRequestException('Schedule data is required');
    }

    const exist = await this.repo.findScheduleById(id, userId);

    if (!exist) {
      throw new NotFoundException('Schedule not found');
    }

    return await this.repo.updateSchedule(id, userId, { ...dto });
  }
}
