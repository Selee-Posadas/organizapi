import { IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateCareerDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;
}