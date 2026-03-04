import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { Contact } from "src/university/domain/entities/contact.entity";
import { UniversityMapper } from "../mappers/university.mapper";
import { ContactRepository } from "src/university/domain/repositories/contact.repository";
import { ContactRule } from "src/university/domain/enums/contact-role.enum";
import { ContactWithSubjectDto } from "src/university/dto/contact/contact-with-subject.dto";

@Injectable()
export class PrismaContactRepository implements ContactRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createContact(data: Partial<Contact>): Promise<Contact> {
        const created = await this.prisma.contact.create({
            data: {
                enrollmentId: data.enrollmentId!,
                name: data.name!,
                role: data.role!,
                email: data.email,
                phone: data.phone,
                whatsappLink: data.whatsappLink,
                notes: data.notes
            }
        });
        return UniversityMapper.toDomainContact(created);
    }

    async updateContact(id: string, userId: string, data: Partial<Contact>): Promise<Contact> {
        const updated = await this.prisma.contact.update({
            where: {
                id,
                enrollment: {
                    userId: userId
                }
            },
            data: { ...data },
        });
        return UniversityMapper.toDomainContact(updated);
    }

    async deleteContact(id: string, userId: string): Promise<void> {
        await this.prisma.contact.delete({
            where: {
                id,
                enrollment: {
                    userId: userId
                }
            }
        });

    }

    async findContactById(id: string, userId: string): Promise<Contact | null> {
        const contact = await this.prisma.contact.findFirst({
            where: {
                id: id,
                enrollment: {
                    userId: userId
                }
            }
        });
        if (!contact) return null;

        return UniversityMapper.toDomainContact(contact);
    }

    async findAllContacts(userId: string): Promise<Contact[]> {
        const contacts = await this.prisma.contact.findMany({
            where: {
                enrollment: {
                    userId: userId
                }
            }
        });

        return contacts.map(UniversityMapper.toDomainContact);
    }

    async findAllContactsWithDetails(userId: string): Promise<ContactWithSubjectDto[]> {
        const contacts = await this.prisma.contact.findMany({
            where: { enrollment: { userId } },
            include: {
                enrollment: {
                    include: {
                        subject: true
                    }
                }
            }
        });
        return contacts.map(UniversityMapper.toResponseContactDto);
    }


    async findByEnrollment(enrollmentId: string, userId: string): Promise<Contact[]> {
        const contacts = await this.prisma.contact.findMany({
            where: {
                enrollmentId,
                enrollment: { userId }
            }
        });

        return contacts.map(UniversityMapper.toDomainContact);
    }

    async findContactByName(contactName: string, userId: string): Promise<Contact[]> {
        const contacts = await this.prisma.contact.findMany({
            where: {
                name: {
                    contains: contactName,
                    mode: 'insensitive'
                },
                enrollment: {
                    userId: userId
                }
            }
        });

        return contacts.map(UniversityMapper.toDomainContact);
    }

    async findContactByRole(role: ContactRule, userId: string): Promise<Contact[]> {
        const contacts = await this.prisma.contact.findMany({
            where: {
                role: role,
                enrollment: {
                    userId: userId
                }
            }
        });

        return contacts.map(UniversityMapper.toDomainContact);
    }

    async findContactBySubject(subjectId: string, userId: string): Promise<Contact[]> {
        const contacts = await this.prisma.contact.findMany({
            where: {
                enrollment: {
                    subjectId: subjectId,
                    userId: userId
                }
            }
        });

        return contacts.map(UniversityMapper.toDomainContact);
    }

    async findContactByCareer(careerId: string, userId: string): Promise<Contact[]> {
        const contacts = await this.prisma.contact.findMany({
            where: {
                enrollment: {
                    userId: userId,
                    subject: {
                        careerId: careerId
                    }
                }
            }
        });

        return contacts.map(UniversityMapper.toDomainContact);
    }

    async findContactByInstitution(institution: string, userId: string): Promise<Contact[]> {
        const contacts = await this.prisma.contact.findMany({
            where: {
                enrollment: {
                    userId: userId,
                    subject: {
                        career: {
                            institution: {
                                contains: institution,
                                mode: 'insensitive'
                            }
                        }
                    }
                }
            }
        });

        return contacts.map(UniversityMapper.toDomainContact);
    }

}