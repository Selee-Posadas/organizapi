import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { Schedule } from "src/university/domain/entities/schedule.entity";
import { ScheduleRepository } from "src/university/domain/repositories/schedule.repository";
import { UniversityMapper } from "../mappers/university.mapper";

@Injectable()
export class PrismaScheduleRepository implements ScheduleRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createSchedule(data: Partial<Schedule>): Promise<Schedule> {
        const created = await this.prisma.schedule.create({
            data: {
                enrollmentId: data.enrollmentId!,
                dayOfWeek: data.dayOfWeek!,
                startTime: data.startTime!,
                endTime: data.endTime!,
                type: data.type!,
                location: data.location,
            }
        });
        return UniversityMapper.toDomainSchedule(created);
    }

    async findByEnrollment(enrollmentId: string, userId: string): Promise<Schedule[]> {
        const result = await this.prisma.schedule.findMany({
            where: { 
                enrollmentId,
                enrollment: { userId }
            }
        });
        return result.map(UniversityMapper.toDomainSchedule);
    }
    
   async deleteSchedule(id: string, userId: string): Promise<void> {
        await this.prisma.schedule.delete({
            where: { 
                id,
                enrollment: { userId } 
            }
        });
    }

    async findTodaySchedules(userId: string, dayOfWeek: number): Promise<Schedule[]> {
        const result = await this.prisma.schedule.findMany({
            where: {
                dayOfWeek,
                enrollment: { userId }
            },
            include: {
                enrollment: {
                    include: { subject: true }
                }
            },
            orderBy: { startTime: 'asc' }
        });
        return result.map(UniversityMapper.toDomainSchedule);
    }

}