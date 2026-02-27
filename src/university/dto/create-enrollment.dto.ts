import { IsInt, IsEnum, IsUUID, Min, Max, IsOptional } from 'class-validator';
import { EnrollmentStatus } from '../domain/enums/enrollment-status.enum';

export class CreateEnrollmentDto {
  @IsUUID()
  subjectId: string;

  @IsEnum(EnrollmentStatus)
  status: EnrollmentStatus;

  @IsInt()
  @Min(2000)
  academicYear: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(10)
  finalGrade?: number;
}