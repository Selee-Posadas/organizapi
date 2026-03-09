import { ScheduleType } from '../../domain/enums/schedule-type.enum';

export class ScheduleWithDetailsDto {
  id: string;
  enrollmentId: string;
  subjectName: string;
  careerName: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  type: ScheduleType;
  location?: string | null;
}
