import { IsEmail, IsOptional, IsString, MinLength, IsNotEmpty } from "class-validator";

export class UpdateUserDto {

    @IsOptional()
    @IsEmail({}, { message: 'Invalid email address' })
    email?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    avatarId?: string;

   
}