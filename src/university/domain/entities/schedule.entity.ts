import { ScheduleType } from '../enums/schedule-type.enum';

export class Schedule {
  constructor(
    public readonly id: string,
    public readonly enrollmentId: string,
    public readonly dayOfWeek: number,
    public readonly startTime: string,
    public readonly endTime: string,
    public readonly type: ScheduleType,
    public readonly location?: string | null,
  ) {
    if (dayOfWeek < 1 || dayOfWeek > 7) throw new Error('Invalid day of week');
  }
}
