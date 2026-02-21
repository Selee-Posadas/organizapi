import { Task } from "src/task/domain/entities/task.entity";
import { TaskRepository } from "src/task/domain/repositories/task.repository";

export class FindByIdUseCase {
    constructor(
        private readonly taskRepository: TaskRepository
    ){}

    async execute(taskId: string, userId: string): Promise<Task> {

        const task = await this.taskRepository.findById(taskId, userId);
        
        if(!task){
            throw new Error('Task not found');
        }

        if(task.userId !== userId){
            throw new Error('You do not have permission to access this task');
        }

        return task;
    }
}