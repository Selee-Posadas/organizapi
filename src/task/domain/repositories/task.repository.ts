import { Task } from "../entities/task.entity";

export interface TaskRepository {
    createTask(task: Partial<Task>): Promise<Task>;
    findAllByUserId(userId: string): Promise<Task[]>;
    findById(taskId: string): Promise<Task | null>;
    updateTask(taskId: string, task: Partial<Task>): Promise<Task>;
    deleteTask(taskId: string): Promise<void>;
}