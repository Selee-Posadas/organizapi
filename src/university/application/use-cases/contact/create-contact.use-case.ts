import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import type { ContactRepository } from '../../../domain/repositories/contact.repository';

import { Contact } from 'src/university/domain/entities/contact.entity';
import { CreateContactDto } from 'src/university/dto/contact/create-contact.dto';
import type { EnrollmentRepository } from 'src/university/domain/repositories/enrollment.repository';


@Injectable()
export class CreateContactUseCase {
    constructor(
        private readonly contactRepo: ContactRepository,
        private readonly enrollRepo: EnrollmentRepository
    ) { }

    async execute(dto: CreateContactDto, userId: string): Promise<Contact> {
        if (!dto) {
            throw new BadRequestException('Contact data is required');
        }
        if (!userId) {
            throw new BadRequestException('User authentication is required');
        }
        const enrollment = await this.enrollRepo.findEnrollmentById(dto.enrollmentId, userId);

        if (!enrollment) throw new NotFoundException('The specified enrollment was not found or access is denied');

        return await this.contactRepo.createContact(dto);
    }
}