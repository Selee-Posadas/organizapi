import {
  IsString,
  IsEnum,
  IsUUID,
  IsDateString,
  IsOptional,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { EvaluationType } from 'src/university/domain/enums/evaluation-type.enum';

export class CreateEvaluationDto {
  @IsUUID()
  enrollmentId: string;

  @IsEnum(EvaluationType)
  type: EvaluationType;

  @IsDateString()
  date: string;

  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  topics?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10)
  grade?: number;

  @IsOptional()
  @IsString()
  reflection?: string;
}
