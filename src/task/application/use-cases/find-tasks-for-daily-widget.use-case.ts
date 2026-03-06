import { Inject, Injectable, BadRequestException } from "@nestjs/common";
import type { TaskRepository } from "src/task/domain/repositories/task.repository";
import { Task } from "src/task/domain/entities/task.entity";

@Injectable()
export class FindTasksForDailyWidgetUseCase {
    constructor(
        @Inject('TaskRepository') 
        private readonly taskRepo: TaskRepository
    ) {}

    async execute(userId: string, date?: string): Promise<Task[]> {
        
        const targetDate = date ? new Date(date) : new Date();

        if (isNaN(targetDate.getTime())) {
            throw new BadRequestException('The Date is not valid');
        }

        targetDate.setHours(0, 0, 0, 0);

        return await this.taskRepo.findTasksForDailyWidget(userId, targetDate);
    }
}