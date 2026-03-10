import { IsOptional, IsString, IsEnum, IsUUID } from 'class-validator';
import { CategoryType } from 'src/category/domain/enum/category-type.enum';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsEnum(CategoryType)
  type?: CategoryType;

  @IsOptional()
  @IsUUID()
  careerId?: string;
}
