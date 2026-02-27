import { IsString, IsInt, Min, Max, IsOptional, MinLength } from 'class-validator';

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
  @IsInt()
  @Min(1)
  @Max(2)
  semester?: number;
}