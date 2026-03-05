import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { Schedule } from "src/university/domain/entities/schedule.entity";
import { ScheduleRepository } from "src/university/domain/repositories/schedule.repository";
import { UniversityMapper } from "../mappers/university.mapper";
import { ScheduleType } from "src/university/domain/enums/schedule-type.enum";
import { ScheduleWithDetailsDto } from "src/university/dto/schedule/schedule-with-details.dto";
import { DayOfWeek } from "src/university/domain/enums/day-of-week.enum";

@Injectable()
export class PrismaScheduleRepository implements ScheduleRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createSchedule(data: Partial<Schedule>, userId: string): Promise<Schedule> {
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

    async updateSchedule(id: string, userId: string, data: Partial<Schedule>): Promise<Schedule> {
        await this.prisma.schedule.updateMany({
            where: {
                id,
                enrollment: { userId }
            },
            data: {
                dayOfWeek: data.dayOfWeek,
                startTime: data.startTime,
                endTime: data.endTime,
                type: data.type,
                location: data.location,
            }
        });

        const updated = await this.findScheduleById(id, userId);
        if (!updated) throw new Error('Schedule not found or access denied');
        return updated;
    }

    async deleteSchedule(id: string, userId: string): Promise<void> {
        const result = await this.prisma.schedule.deleteMany({
            where: {
                id,
                enrollment: { userId }
            }
        });

        if (result.count === 0) throw new Error('Schedule not found or access denied');
    }

    async findScheduleById(id: string, userId: string): Promise<Schedule | null> {
        const schedule = await this.prisma.schedule.findFirst({
            where: {
                id,
                enrollment: { userId }
            }
        });
        return schedule ? UniversityMapper.toDomainSchedule(schedule) : null;
    }

    async findAllSchedulesWithDetails(userId: string): Promise<ScheduleWithDetailsDto[]> {
        const schedules = await this.prisma.schedule.findMany({
            where: {
                enrollment: { userId }
            },
            include: {
                enrollment: {
                    include: {
                        subject: {
                            include: { career: true }
                        }
                    }
                }
            },
            orderBy: [
                { dayOfWeek: 'asc' },
                { startTime: 'asc' }
            ]
        });

        return schedules.map(s => UniversityMapper.toResponseScheduleDto(s));
    }

    async findScheduleByEnrollment(enrollmentId: string, userId: string): Promise<Schedule[]> {
        const schedules = await this.prisma.schedule.findMany({
            where: {
                enrollmentId,
                enrollment: { userId }
            },
        });
        return schedules.map(UniversityMapper.toDomainSchedule);
    }

    async findSchedulesByDayOfWeek(dayOfWeek: DayOfWeek, userId: string): Promise<Schedule[]> {
        const schedules = await this.prisma.schedule.findMany({
            where: {
                dayOfWeek,
                enrollment: { userId }
            },
        });
        return schedules.map(UniversityMapper.toDomainSchedule);
    }

    async findAllSchedules(userId: string): Promise<Schedule[]> {
        const schedules = await this.prisma.schedule.findMany({
            where: {
                enrollment: { userId }
            },
        });
        return schedules.map(UniversityMapper.toDomainSchedule);
    }

    async findSchedulesByStartTime(startTime: string, userId: string): Promise<Schedule[]> {
        const schedules = await this.prisma.schedule.findMany({
            where: { startTime, enrollment: { userId } },
        });
        return schedules.map(UniversityMapper.toDomainSchedule);
    }

    async findSchedulesByType(type: ScheduleType, userId: string): Promise<Schedule[]> {
        const schedules = await this.prisma.schedule.findMany({
            where: { type, enrollment: { userId } },
        });
        return schedules.map(UniversityMapper.toDomainSchedule);
    }

    async findSchedulesByLocation(location: string, userId: string): Promise<Schedule[]> {
        const schedules = await this.prisma.schedule.findMany({
            where: {
                location: { contains: location, mode: 'insensitive' },
                enrollment: { userId }
            },
        });
        return schedules.map(UniversityMapper.toDomainSchedule);
    }

    async findSchedulesByDayWithDetails(day: DayOfWeek, userId: string): Promise<ScheduleWithDetailsDto[]> {
        const schedules = await this.prisma.schedule.findMany({
            where: {
                dayOfWeek: day,
                enrollment: { userId }
            },
            include: {
                enrollment: {
                    include: {
                        subject: {
                            include: { career: true }
                        }
                    }
                }
            },
            orderBy: { startTime: 'asc' }
        });

        return schedules.map(s => UniversityMapper.toResponseScheduleDto(s));
    }

}