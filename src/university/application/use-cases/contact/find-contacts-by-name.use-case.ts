import { BadRequestException, Injectable } from "@nestjs/common";
import { ContactRule } from "src/university/domain/enums/contact-role.enum";
import type { ContactRepository } from "src/university/domain/repositories/contact.repository";

@Injectable()
export class FindContactsByNameUseCase {
    constructor(private readonly contactRepo: ContactRepository) { }

    async execute(contactName: string, userId: string) {
        if (!contactName || contactName.length < 3) return [];
        if (!userId) {
            throw new BadRequestException('User authentication is required');
        }
        return await this.contactRepo.findContactByName(contactName, userId);
    }
}