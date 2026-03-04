import { ScheduleRepository } from "src/university/domain/repositories/schedule.repository";

export class DeleteScheduleUseCase {
    constructor(private readonly scheduleRepo: ScheduleRepository) { }

    async execute(id: string, userId: string): Promise<void> {
        await this.scheduleRepo.deleteSchedule(id, userId);
    }
}