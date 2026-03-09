import {
  IsString,
  IsInt,
  Min,
  Max,
  IsEnum,
  Matches,
  IsOptional,
} from 'class-validator';
import { ScheduleType } from '../../domain/enums/schedule-type.enum';

export class UpdateScheduleDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(7)
  dayOfWeek?: number;

  @IsOptional()
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'startTime must be HH:mm',
  })
  startTime?: string;

  @IsOptional()
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'endTime must be HH:mm',
  })
  endTime?: string;

  @IsOptional()
  @IsEnum(ScheduleType)
  type?: ScheduleType;

  @IsOptional()
  @IsString()
  location?: string;
}
