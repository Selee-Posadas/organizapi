import { BadRequestException, Injectable } from "@nestjs/common";
import type { ContactRepository } from "src/university/domain/repositories/contact.repository";


@Injectable()
export class FindContactsBySubjectUseCase {
    constructor(private readonly contactRepo: ContactRepository) { }

    async execute(subjectId: string, userId: string) {
        if(!subjectId){
            throw new BadRequestException('Subject ID is required to fetch contacts');
        }
        if(!userId){
            throw new BadRequestException('User authentication is required');
        }
        return await this.contactRepo.findContactBySubject(subjectId, userId);
    }
}