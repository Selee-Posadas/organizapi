import { Task } from "src/task/domain/entities/task.entity";
import { TaskRepository } from "src/task/domain/repositories/task.repository";

export class FindAllTaskUseCase {
    constructor(
        private readonly taskRepository: TaskRepository
    ){}

    async execute(userId: string): Promise<Task[]> {
        return this.taskRepository.findAllByUserId(userId);
    }
}