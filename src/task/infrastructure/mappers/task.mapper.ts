import { Task } from "src/task/domain/entities/task.entity";
import { EnergyLevel } from "src/task/domain/enum/task-energy.enum";
import { TaskPriority } from "src/task/domain/enum/task-priority.enum";
import { TaskStatus } from "src/task/domain/enum/task-status.enum";

export class TaskMapper {
    static toDomain(raw: any): Task {
        return new Task(
            raw.id,
            raw.title,
            raw.description,
            raw.status as TaskStatus,
            raw.priority as TaskPriority,
            raw.energyRequired as EnergyLevel,
            raw.userId,
            raw.goalId,
            raw.categoryId,
            raw.dueDate,
            raw.startTime,
            raw.endTime,
            raw.createdAt
        );
    }

    static toPersistencePartial(data: Partial<Task>) {
        const persistenceData: any = {};

        if (data.title) persistenceData.title = data.title;
        if (data.description !== undefined) persistenceData.description = data.description;
        if (data.status) persistenceData.status = data.status;
        if (data.priority) persistenceData.priority = data.priority;
        if (data.energyRequired) persistenceData.energyRequired = data.energyRequired;
        if (data.goalId !== undefined) persistenceData.goalId = data.goalId;
        if (data.categoryId !== undefined) persistenceData.categoryId = data.categoryId;
        if (data.dueDate !== undefined) persistenceData.dueDate = data.dueDate;
        if (data.startTime !== undefined) persistenceData.startTime = data.startTime;
        if (data.endTime !== undefined) persistenceData.endTime = data.endTime;

        return persistenceData;
    }
}