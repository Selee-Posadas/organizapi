import { Schedule } from "../entities/schedule.entity";

export interface ScheduleRepository {
  createSchedule(data: Partial<Schedule>, userId: string): Promise<Schedule>;
  findByEnrollment(enrollmentId: string, userId: string): Promise<Schedule[]>;
  deleteSchedule(id: string, userId: string): Promise<void>;
  findTodaySchedules(userId: string, dayOfWeek: number): Promise<Schedule[]>;
}