import { IsString, IsInt, Min, Max, IsEnum, IsUUID, Matches, IsOptional } from 'class-validator';
import { ScheduleType } from '../../domain/enums/schedule-type.enum';

export class CreateScheduleDto {
  @IsUUID()
  enrollmentId: string;

  @IsInt()
  @Min(1)
  @Max(7)
  dayOfWeek: number;

  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'startTime must be HH:mm' })
  startTime: string;

  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'endTime must be HH:mm' })
  endTime: string;

  @IsEnum(ScheduleType)
  type: ScheduleType;

  @IsOptional()
  @IsString()
  location?: string;
}