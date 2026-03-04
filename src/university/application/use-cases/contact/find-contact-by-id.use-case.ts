import { BadRequestException, Injectable } from "@nestjs/common";
import { Contact } from "src/university/domain/entities/contact.entity";
import type { ContactRepository } from "src/university/domain/repositories/contact.repository";

@Injectable()
export class FindContactByIdUseCase {
    constructor(private readonly contactRepo: ContactRepository) { }

    async execute(id: string, userId: string): Promise<Contact | null> {
        if (!id) {
            throw new BadRequestException('Contact ID is required to fetch contacts');
        }
        if (!userId) {
            throw new BadRequestException('User authentication is required');
        }
        return await this.contactRepo.findContactById(id, userId);
    }
}