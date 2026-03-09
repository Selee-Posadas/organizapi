import {
  IsString,
  IsEnum,
  IsUrl,
  IsOptional,
  IsUUID,
  MinLength,
} from 'class-validator';
import { ResourceType } from 'src/university/domain/enums/resouce-type.enum';

export class UpdateResourceDto {
  @IsUUID()
  enrollmentId: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  name: string;

  @IsOptional()
  @IsEnum(ResourceType)
  type: ResourceType;

  @IsOptional()
  @IsUrl()
  url?: string;
}
