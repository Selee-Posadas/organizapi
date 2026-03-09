import { IsString, MinLength, IsOptional, IsEnum } from 'class-validator';
import { StudyType } from 'src/university/domain/enums/study-type.enum';

export class UpdateCareerDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;

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
