import { IsString, IsOptional, IsEnum, MinLength } from 'class-validator';
import { TaskStatus } from '../domain/enum/task-status.enum';


export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}