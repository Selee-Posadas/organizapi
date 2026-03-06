import { EnergyLevel } from "../enum/task-energy.enum";
import { TaskPriority } from "../enum/task-priority.enum";
import { TaskStatus } from "../enum/task-status.enum";

export class Task {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly description: string | null,
        public readonly status: TaskStatus,
        public readonly priority: TaskPriority,
        public readonly energyRequired: EnergyLevel,
        public readonly userId: string,
        public readonly goalId: string | null = null,
        public readonly categoryId: string | null = null,
        public readonly dueDate: Date | null = null,
        public readonly startTime: string | null = null,
        public readonly endTime: string | null = null,
        public readonly createdAt: Date = new Date(),
    ){
        if (!title || title.length < 3) throw new Error('The tittle is to low');
    }
}