import {
  IsString,
  IsEnum,
  IsUrl,
  IsOptional,
  IsUUID,
  MinLength,
} from 'class-validator';
import { ResourceType } from 'src/university/domain/enums/resouce-type.enum';

export class CreateResourceDto {
  @IsUUID()
  enrollmentId: string;

  @IsString()
  @MinLength(2)
  name: string;

  @IsEnum(ResourceType)
  type: ResourceType;

  @IsOptional()
  @IsUrl()
  url?: string;
}
