import { Task } from '../entities/task.entity';
import { EnergyLevel } from '../enum/task-energy.enum';

export interface TaskRepository {
  createTask(userId: string, task: Partial<Task>): Promise<Task>;
  updateTask(id: string, userId: string, data: Partial<Task>): Promise<Task>;
  deleteTask(id: string, userId: string): Promise<void>;

  findTaskById(id: string, userId: string): Promise<Task | null>;
  findAllTasksByUserId(userId: string): Promise<Task[]>;

  findTasksByCategory(categoryId: string, userId: string): Promise<Task[]>;
  findTasksByEnrollment(enrollmentId: string, userId: string): Promise<Task[]>;
  findTasksForDailyWidget(userId: string, date: Date): Promise<Task[]>;
}
