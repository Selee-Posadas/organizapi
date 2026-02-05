import { Task, TaskStatus } from "src/task/domain/entities/task.entity";
import { TaskRepository } from "src/task/domain/repositories/task.repository";
import { CreateTaskDto } from "src/task/dto/create-task.dto";

export class CreateTaskUseCase {
    constructor(
        private readonly taskRepository: TaskRepository,
    ) {}

    async execute(dto: CreateTaskDto, userId: string): Promise<Task> {

        const newTask = await this.taskRepository.createTask({
            title: dto.title,
            description: dto.description,
            status: (dto.status as TaskStatus) || 'PENDING',
            userId: userId,
        });

        return newTask;

    }

}