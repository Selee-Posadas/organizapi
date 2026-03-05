import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import type { ScheduleRepository } from "src/university/domain/repositories/schedule.repository";
import { Schedule } from "src/university/domain/entities/schedule.entity";

@Injectable()
export class FindScheduleByIdUseCase {
    constructor(
        @Inject('ScheduleRepository')
        private readonly repo: ScheduleRepository
    ) { }

    async execute(id: string, userId: string): Promise<Schedule | null> {
        if (!id) {
            throw new BadRequestException('Schedule ID is required');
        }
        if (!userId) {
            throw new BadRequestException('User authentication is required');
        }

        return await this.repo.findScheduleById(id, userId);
    }
}