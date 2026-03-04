import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import type { ContactRepository } from "src/university/domain/repositories/contact.repository";

@Injectable()
export class DeleteContactUseCase {
    constructor(
        private readonly contactRepo: ContactRepository,
    ) { }

    async execute(id: string, userId: string) {

        if (!id) {
            throw new BadRequestException('Contact ID is required to delete contact');
        }
        if (!userId) {
            throw new BadRequestException('User authentication is required');
        }

        const deleted = await this.contactRepo.findContactById(id, userId);

        if (!deleted) throw new NotFoundException('Contact not found or access denied');

        return await this.contactRepo.deleteContact(id, userId);
    }
}