import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import type { ScheduleRepository } from "src/university/domain/repositories/schedule.repository";
import { Schedule } from "src/university/domain/entities/schedule.entity";

@Injectable()
export class FindScheduleByLocationUseCase {
    constructor(
        @Inject('ScheduleRepository')
        private readonly repo: ScheduleRepository
    ) { }

    async execute(location: string, userId: string): Promise<Schedule[]> {
        if (!location) {
            throw new BadRequestException('Schedule location is required');
        }
        if (!userId) {
            throw new BadRequestException('User authentication is required');
        }

        return await this.repo.findSchedulesByLocation(location, userId);
    }
}