import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import type { ScheduleRepository } from "src/university/domain/repositories/schedule.repository";
import { Schedule } from "src/university/domain/entities/schedule.entity";

@Injectable()
export class FindAllSchedulesUseCase {
    constructor(
        @Inject('ScheduleRepository')
        private readonly repo: ScheduleRepository
    ) { }

    async execute(userId: string): Promise<Schedule[]> {
        if (!userId) {
            throw new BadRequestException('User authentication is required');
        }

        return await this.repo.findAllSchedules(userId);
    }
}