import { Schedule } from "src/university/domain/entities/schedule.entity";
import { ScheduleRepository } from "src/university/domain/repositories/schedule.repository";


export class GetTodaySchedulesUseCase {
    constructor(private readonly scheduleRepo: ScheduleRepository) { }

    async execute(userId: string): Promise<Schedule[]> {

        const now = new Date();
        let dayOfWeek = now.getDay();
        
        dayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;

        return await this.scheduleRepo.findTodaySchedules(userId, dayOfWeek);
    }
}