import { Task, TaskStatus } from "src/task/domain/entities/task.entity";

export class TaskMapper {
    static toDomain(raw: any): Task {
        return new Task(
            raw.id,
            raw.title,
            raw.description,
            raw.status as TaskStatus,
            raw.userId,
            raw.createdAt,
            raw.updatedAt
        );
    }

    static toPersistence(task: Task) {
        return {
            title: task.title,
            description: task.description,
            status: task.status,
            userId: task.userId,
        };
    }

    static toPersistencePartial(data: Partial<Task>) {
        const persistenceData: any = {};

        if (data.title) persistenceData.title = data.title;
        if (data.description !== undefined) persistenceData.description = data.description;
        if (data.status) persistenceData.status = data.status;

        return persistenceData;
    }

}