import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ContactRule } from "src/university/domain/enums/contact-role.enum";
import type { ContactRepository } from "src/university/domain/repositories/contact.repository";

@Injectable()
export class FindContactsByRoleUseCase {
    constructor(
        @Inject('ContactRepository')
        private readonly contactRepo: ContactRepository
    ) { }

    async execute(role: ContactRule, userId: string) {
        if (!role) {
            throw new BadRequestException('Role is required to fetch contacts');
        }
        if (!userId) {
            throw new BadRequestException('User authentication is required');
        }
        return await this.contactRepo.findContactByRole(role, userId);
    }
}