import { BadRequestException, Injectable } from "@nestjs/common";
import type { ContactRepository } from "src/university/domain/repositories/contact.repository";

@Injectable()
export class FindContactsByInstitutionUseCase {
    constructor(private readonly contactRepo: ContactRepository) { }

    async execute(institution: string, userId: string) {
        if (!institution || institution.length < 3) return [];

        if(!userId){
            throw new BadRequestException('User authentication is required');
        }

        return await this.contactRepo.findContactByInstitution(institution, userId);
    }
}