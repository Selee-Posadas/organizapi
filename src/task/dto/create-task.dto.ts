import { IsString, IsOptional, IsEnum, MinLength, IsUUID, IsDateString } from 'class-validator';
import { TaskStatus } from '../domain/enum/task-status.enum';
import { TaskPriority } from '../domain/enum/task-priority.enum';
import { EnergyLevel } from '../domain/enum/task-energy.enum';

export class CreateTaskDto {
    @IsString()
    title: string;

    @IsOptional() 
    @IsString()
    description?: string;

    @IsOptional() 
    @IsString()
    status?: TaskStatus;

    @IsOptional() 
    @IsEnum(TaskPriority)
    priority?: TaskPriority = TaskPriority.MEDIUM;

    @IsOptional() 
    @IsEnum(EnergyLevel)
    energyRequired?: EnergyLevel = EnergyLevel.MEDIUM;

    @IsOptional() 
    @IsUUID()
    goalId?: string;

    @IsOptional() 
    @IsUUID()
    categoryId?: string;

    @IsOptional() 
    @IsDateString()
    dueDate?: string;

    @IsOptional() 
    @IsString() 
    startTime?: string;

    @IsOptional() 
    @IsString()
    endTime?: string;
}