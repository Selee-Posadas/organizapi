import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsOptional()
    @IsString()
    color?: string;
}