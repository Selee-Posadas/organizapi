import { BadRequestException, Injectable } from "@nestjs/common";
import type { ContactRepository } from "src/university/domain/repositories/contact.repository";
import { Contact } from "src/university/domain/entities/contact.entity";

@Injectable()
export class FindContactsByEnrollmentUseCase {
    constructor(
        private readonly contactRepo: ContactRepository,
    ) { }

    async execute(enrollmentId: string, userId: string): Promise<Contact[]> {
        if (!enrollmentId) {
            throw new BadRequestException('Enrollment ID is required to fetch contacts');
        }
        if (!userId) {
            throw new BadRequestException('User authentication is required');
        }
        return await this.contactRepo.findByEnrollment(enrollmentId, userId);
    }
}