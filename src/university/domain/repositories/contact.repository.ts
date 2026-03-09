import { ContactWithSubjectDto } from 'src/university/dto/contact/contact-with-subject.dto';
import { Contact } from '../entities/contact.entity';
import { ContactRule } from '../enums/contact-role.enum';

export interface ContactRepository {
  createContact(data: Partial<Contact>): Promise<Contact>;
  updateContact(
    id: string,
    userId: string,
    data: Partial<Contact>,
  ): Promise<Contact>;
  deleteContact(id: string, userId: string): Promise<void>;

  findContactById(id: string, userId: string): Promise<Contact | null>;
  findAllContacts(userId: string): Promise<Contact[]>;
  findAllContactsWithDetails(userId: string): Promise<ContactWithSubjectDto[]>;
  findByEnrollment(enrollmentId: string, userId: string): Promise<Contact[]>;

  findContactByName(contactName: string, userId: string): Promise<Contact[]>;
  findContactByRole(role: ContactRule, userId: string): Promise<Contact[]>;

  findContactBySubject(subjectId: string, userId: string): Promise<Contact[]>;
  findContactByCareer(careerId: string, userId: string): Promise<Contact[]>;
  findContactByInstitution(
    institution: string,
    userId: string,
  ): Promise<Contact[]>;
}
