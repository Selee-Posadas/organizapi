import { IsString, MinLength } from 'class-validator';

export class CreateCareerDto {
  @IsString()
  @MinLength(3, { message: 'Invalid name' })
  name: string;
}