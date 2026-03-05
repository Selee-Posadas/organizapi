import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import type { ScheduleRepository } from "src/university/domain/repositories/schedule.repository";
import { Schedule } from "src/university/domain/entities/schedule.entity";

@Injectable()
export class FindScheduleByEnrollUseCase {
    constructor(
        @Inject('ScheduleRepository')
        private readonly repo: ScheduleRepository
    ) { }

    async execute(enrollId: string, userId: string): Promise<Schedule[]> {
        if (!enrollId) {
            throw new BadRequestException('Enrolled ID is required');
        }
        if (!userId) {
            throw new BadRequestException('User authentication is required');
        }

        return await this.repo.findScheduleByEnrollment(enrollId, userId);
    }
}