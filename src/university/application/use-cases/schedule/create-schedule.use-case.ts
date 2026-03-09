import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Schedule } from 'src/university/domain/entities/schedule.entity';
import type { EnrollmentRepository } from 'src/university/domain/repositories/enrollment.repository';
import type { ScheduleRepository } from 'src/university/domain/repositories/schedule.repository';
import { CreateScheduleDto } from 'src/university/dto/schedule/create-schedule.dto';

@Injectable()
export class CreateScheduleUseCase {
  constructor(
    @Inject('ScheduleRepository')
    private readonly scheduleRepo: ScheduleRepository,
    @Inject('EnrollmentRepository')
    private readonly enrollRepo: EnrollmentRepository,
  ) {}

  async execute(dto: CreateScheduleDto, userId: string): Promise<Schedule> {
    if (!dto) {
      throw new BadRequestException('Schedule data is required');
    }
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }

    const enrollment = await this.enrollRepo.findEnrollmentById(
      dto.enrollmentId,
      userId,
    );

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found or access denied');
    }

    if (dto.startTime >= dto.endTime) {
      throw new BadRequestException('Start time must be earlier than end time');
    }

    return await this.scheduleRepo.createSchedule(dto, userId);
  }
}
