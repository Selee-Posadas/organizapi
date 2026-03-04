import { BadRequestException, Injectable } from "@nestjs/common";
import type { ContactRepository } from "src/university/domain/repositories/contact.repository";

@Injectable()
export class FindContactsByCareerUseCase {
    constructor(private readonly contactRepo: ContactRepository) { }

    async execute(careerId: string, userId: string) {
        if (!careerId) {
            throw new BadRequestException('Career ID is required to fetch contacts');
        }
        if (!userId) {
            throw new BadRequestException('User authentication is required');
        }
        return await this.contactRepo.findContactByCareer(careerId, userId);
    }
}