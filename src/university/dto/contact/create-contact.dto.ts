import {
  IsString,
  IsUUID,
  IsEnum,
  IsOptional,
  IsEmail,
  MinLength,
} from 'class-validator';
import { ContactRule } from 'src/university/domain/enums/contact-role.enum';

export class CreateContactDto {
  @IsUUID()
  enrollmentId: string;

  @IsString()
  @MinLength(3)
  name: string;

  @IsEnum(ContactRule)
  role: ContactRule;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  whatsappLink?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
