import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { SubjectRepository } from "src/university/domain/repositories/subject.repository";
import { Subject } from "src/university/domain/entities/subject.entity";
import type { CareerRepository } from "src/university/domain/repositories/career.repository";

@Injectable()
export class FindSubjectsByCareerUseCase {
    constructor(
        @Inject('SubjectRepository')
        private readonly subjectRepository: SubjectRepository,
        @Inject('CareerRepository')
        private readonly careerRepo: CareerRepository
    ) { }

    async execute(careerId: string, userId: string): Promise<Subject[]> {
        if (!careerId) {
            throw new BadRequestException('Career ID is required');
        }
        if (!userId) {
            throw new BadRequestException('User authentication is required');
        }

        const career = await this.careerRepo.findCareerById(careerId, userId);
        if (!career) throw new NotFoundException('Career not found');

        return await this.subjectRepository.findSubjectsByCareer(careerId, userId);
    }
}