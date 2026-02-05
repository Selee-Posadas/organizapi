import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {

    @IsString()
    @IsNotEmpty({ message: 'Title is required' })
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    status?: string;

}