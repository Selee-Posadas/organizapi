import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { Task } from "src/task/domain/entities/task.entity";
import { TaskRepository } from "src/task/domain/repositories/task.repository";
import { TaskMapper } from "../mappers/task.mapper";

@Injectable()
export class PrismaTaskRepository implements TaskRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createTask(task: Task): Promise<Task> {
        const data = TaskMapper.toPersistence(task);

        const createdTask = await this.prisma.task.create({
            data,
        });

        return TaskMapper.toDomain(createdTask);
    }

    async findById(id: string, userId: string): Promise<Task | null> {
        const task = await this.prisma.task.findUnique({
            where: {
                id_userId: { id, userId }
            },
        });

        if (!task) return null;

        return TaskMapper.toDomain(task);
    }


    async findAllByUserId(userId: string): Promise<Task[]> {
        const tasks = await this.prisma.task.findMany({
            where: { userId },
        });
        if (!tasks) return [];

        return tasks.map(TaskMapper.toDomain);
    }

    async updateTask(id: string, userId: string, task: Partial<Task>): Promise<Task> {
        const persistenceData = TaskMapper.toPersistencePartial(task);

        const updatedTask = await this.prisma.task.update({
            where: { 
                id_userId: { id, userId }
            },
            data: persistenceData,
        });

        return TaskMapper.toDomain(updatedTask);
    }

    async deleteTask(id: string, userId:string): Promise<void> {
        await this.prisma.task.delete({
            where: { 
                id_userId: { id, userId }
             },
        });

    }
}