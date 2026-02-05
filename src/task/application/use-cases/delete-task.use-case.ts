import { TaskRepository } from "src/task/domain/repositories/task.repository";


export class DeleteTaskUseCase {
    constructor(private readonly taskRepository: TaskRepository) {}

    async execute(taskId: string, userId: string): Promise<void> {
        const task = await this.taskRepository.findById(taskId);

        if (!task) {
            throw new Error('Task not found');
        }

       
        if (task.userId !== userId) {
            throw new Error('You do not have permission to delete this task');
        }


        await this.taskRepository.deleteTask(taskId);
    }
}