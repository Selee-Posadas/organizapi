import { IsInt, IsEnum, Min, Max, IsOptional } from 'class-validator';
import { EnrollmentStatus } from '../domain/enums/enrollment-status.enum';

export class UpdateEnrollmentDto {
  @IsOptional()
  @IsEnum(EnrollmentStatus)
  status?: EnrollmentStatus;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(10)
  finalGrade?: number;

  @IsOptional()
  @IsInt()
  @Min(2020)
  academicYear?: number;
}