import { ContactRule } from "src/university/domain/enums/contact-role.enum";

export class ContactWithSubjectDto {
  id: string;
  name: string;
  role: ContactRule;
  email?: string;
  phone?: string;
  whatsappLink?: string;
  notes?: string;
  subjectName: string; 
}