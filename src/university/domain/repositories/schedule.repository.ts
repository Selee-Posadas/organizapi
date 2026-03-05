import { ScheduleWithDetailsDto } from "src/university/dto/schedule/schedule-with-details.dto";
import { Schedule } from "../entities/schedule.entity";
import { ScheduleType } from "../enums/schedule-type.enum";
import { DayOfWeek } from "../enums/day-of-week.enum";

export interface ScheduleRepository {
  createSchedule(data: Partial<Schedule>, userId: string): Promise<Schedule>;
  updateSchedule(id: string, userId: string, data: Partial<Schedule>): Promise<Schedule>;
  deleteSchedule(id: string, userId: string): Promise<void>;
  findScheduleById(id: string, userId: string): Promise<Schedule | null >;
  findScheduleByEnrollment(enrollmentId: string, userId: string): Promise<Schedule[]>;
  
  findSchedulesByDayOfWeek(dayOfWeek: DayOfWeek, userId: string): Promise<Schedule[]>;
  findSchedulesByStartTime(startTime: string, userId: string): Promise<Schedule[]>;
  findSchedulesByType(type: ScheduleType, userId: string): Promise<Schedule[]>;
  findSchedulesByLocation(location: string, userId: string): Promise<Schedule[]>;
  findAllSchedules(userId: string): Promise<Schedule[]>;
  findAllSchedulesWithDetails(userId: string): Promise<ScheduleWithDetailsDto[]>;
  findSchedulesByDayWithDetails(day: DayOfWeek, userId: string): Promise<ScheduleWithDetailsDto[]>;
}