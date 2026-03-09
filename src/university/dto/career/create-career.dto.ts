import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { StudyType } from 'src/university/domain/enums/study-type.enum';

export class CreateCareerDto {
  @IsString()
  @MinLength(3, { message: 'Invalid name' })
  name: string;

  @IsOptional()
  @IsString()
  institution?: string;

  @IsOptional()
  @IsEnum(StudyType)
  type?: StudyType;

  @IsOptional()
  @IsString()
  whatsappGroup?: string;

  @IsOptional()
  @IsString()
  facultyContactInfo?: string;
}
