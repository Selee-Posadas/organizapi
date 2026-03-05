import { IsString, IsInt, Min, IsUUID, MinLength, IsOptional, IsEnum } from 'class-validator';
import { SubjectType } from 'src/university/domain/enums/subject-type.enum';

export class CreateSubjectDto {
  @IsUUID()
  careerId: string;

  @IsString()
  @MinLength(2)
  name: string;

  @IsInt()
  @Min(1)
  yearLevel: number;

  @IsEnum(SubjectType)
  semester: SubjectType;

  @IsOptional()
  @IsInt()
  @Min(0)
  credits: number = 0;
}