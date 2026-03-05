import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import type { ScheduleRepository } from "src/university/domain/repositories/schedule.repository";
import { Schedule } from "src/university/domain/entities/schedule.entity";
import { DayOfWeek } from "src/university/domain/enums/day-of-week.enum";

@Injectable()
export class FindScheduleByDayUseCase {
    constructor(
        @Inject('ScheduleRepository')
        private readonly repo: ScheduleRepository
    ) { }

    async execute(day: DayOfWeek, userId: string): Promise<Schedule[]> {
        if (!day) {
            throw new BadRequestException('Schedule day is required');
        }
        if (!userId) {
            throw new BadRequestException('User authentication is required');
        }

        return await this.repo.findSchedulesByDayOfWeek(day, userId);
    }
}