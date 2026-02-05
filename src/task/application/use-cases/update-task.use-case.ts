import { Task, TaskStatus } from "src/task/domain/entities/task.entity";
import { TaskRepository } from "src/task/domain/repositories/task.repository";
import { UpdateTaskDto } from "src/task/dto/update-task.dto";

export class UpdateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(userId: string, taskId: string, dto: UpdateTaskDto): Promise<Task> {

    const existingTask = await this.taskRepository.findById(taskId);


    if (!existingTask) {
      throw new Error('Task not found');
    }


    if (existingTask.userId !== userId) {
      throw new Error('You do not have permission to update this task');
    }


    const updatedTask = await this.taskRepository.updateTask(taskId, {
      title: dto.title,
      description: dto.description,
      status: (dto.status as TaskStatus) || existingTask.status,
    });

    return updatedTask;
  }
}