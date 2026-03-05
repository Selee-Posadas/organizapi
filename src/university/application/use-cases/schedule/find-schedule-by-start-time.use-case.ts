import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import type { ScheduleRepository } from 'src/university/domain/repositories/schedule.repository';
import { Schedule } from 'src/university/domain/entities/schedule.entity';

@Injectable()
export class FindSchedulesByStartTimeUseCase {
    constructor(
        @Inject('ScheduleRepository') 
        private readonly repo: ScheduleRepository
    ) { }

    async execute(startTime: string, userId: string): Promise<Schedule[]> {
       
        if (!startTime) {
            throw new BadRequestException('Schedule startTime is required');
        }
        if (!userId) {
            throw new BadRequestException('User authentication is required');
        }

        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        
        if (!timeRegex.test(startTime)) {
            throw new BadRequestException('Invalid time format. Use HH:mm (e.g., 18:00)');
        }

        return await this.repo.findSchedulesByStartTime(startTime, userId);
    }
}