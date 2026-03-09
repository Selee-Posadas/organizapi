import {
  IsString,
  IsInt,
  Min,
  IsOptional,
  MinLength,
  IsEnum,
} from 'class-validator';
import { SubjectType } from 'src/university/domain/enums/subject-type.enum';

export class UpdateSubjectDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  yearLevel?: number;

  @IsOptional()
  @IsEnum(SubjectType)
  semester?: SubjectType;

  @IsOptional()
  @IsInt()
  @Min(0)
  credits: number;
}
