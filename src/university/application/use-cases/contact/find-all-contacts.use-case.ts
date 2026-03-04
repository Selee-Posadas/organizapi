import { BadRequestException, Injectable } from "@nestjs/common";
import { Contact } from "src/university/domain/entities/contact.entity";
import type { ContactRepository } from "src/university/domain/repositories/contact.repository";

@Injectable()
export class FindAllContactsUseCase {
    constructor(private readonly contactRepo: ContactRepository) { }

    async execute(userId: string): Promise<Contact[]> {
        if (!userId) {
            throw new BadRequestException('User authentication is required');
        }
        return await this.contactRepo.findAllContacts(userId);
    }
}