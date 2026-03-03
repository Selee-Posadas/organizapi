import { IsString, IsInt, Min, Max, IsUUID, MinLength, IsOptional } from 'class-validator';

export class CreateSubjectDto {
  @IsUUID()
  careerId: string;

  @IsString()
  @MinLength(2)
  name: string;

  @IsInt()
  @Min(1)
  yearLevel: number;

  @IsInt()
  @Min(0)
  @Max(2)
  semester: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  credits: number = 0;
}