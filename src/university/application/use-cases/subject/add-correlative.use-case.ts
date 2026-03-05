import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import type { SubjectRepository } from "src/university/domain/repositories/subject.repository";
import { EnrollmentStatus } from "src/university/domain/enums/enrollment-status.enum";

@Injectable()
export class AddCorrelativeUseCase {
    constructor(
        @Inject('SubjectRepository')
        private readonly subjectRepository: SubjectRepository
    ) { }

    async execute(subjectId: string, requiredId: string, type: EnrollmentStatus, userId: string): Promise<void> {
        if (!subjectId || !requiredId) {
            throw new BadRequestException('Both Subject IDs are required');
        }
        if (!userId) {
            throw new BadRequestException('User authentication is required');
        }

        if (subjectId === requiredId) {
            throw new BadRequestException('A subject cannot be correlative of itself');
        }

        const allowedStatuses = [EnrollmentStatus.REGULAR, EnrollmentStatus.APPROVED];

        if (!allowedStatuses.includes(type)) {
            throw new BadRequestException('A correlative requirement must be either REGULAR or APPROVED');
        }

        const validatedType = type as EnrollmentStatus.REGULAR | EnrollmentStatus.APPROVED;

        await this.subjectRepository.addCorrelative(subjectId, requiredId, validatedType, userId);
    }
}