import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import type { ContactRepository } from "src/university/domain/repositories/contact.repository";
import { UpdateContactDto } from "src/university/dto/contact/update-contact.dto";

@Injectable()
export class UpdateContactUseCase {
    constructor(
        private readonly contactRepo: ContactRepository,
    ) { }

    async execute(id: string, userId: string, dto: UpdateContactDto) {

        if (!id) {
            throw new BadRequestException('Contact ID is required to edit contacts');
        }
        if (!userId) {
            throw new BadRequestException('User authentication is required');
        }

        const update = await this.contactRepo.findContactById(id, userId);

        if (!update) throw new NotFoundException('Contact not found or access denied');

        return await this.contactRepo.updateContact(id,
            userId,
            {
                ...dto
            });
    }
}