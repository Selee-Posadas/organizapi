
import { Enrollment } from 'src/university/domain/entities/enrollment.entity';
import { SubjectRepository } from 'src/university/domain/repositories/subject.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { EnrollmentStatus } from 'src/university/domain/enums/enrollment-status.enum';
import { EnrollmentRepository } from 'src/university/domain/repositories/enrollment.repository';
import { CreateEnrollmentDto } from 'src/university/dto/enrollment/create-enrollment.dto';
export class EnrollInSubjectUseCase {
    constructor(
        private readonly enrollRepository: EnrollmentRepository,
        private readonly subjectRepository: SubjectRepository
    ) { }

    async execute(dto: CreateEnrollmentDto, userId: string): Promise<Enrollment> {

        const subject = await this.subjectRepository.findSubjectById(dto.subjectId, userId);

        if (!subject) {
            throw new NotFoundException('The subject does not exist or you do not have access');
        }
        const existingEnrollment = await this.enrollRepository.findEnrollmentByUserAndSubject(userId, dto.subjectId);
        if (existingEnrollment) {
            throw new BadRequestException('You are alredy enrolled to this subject');
        }

        const requirements = await this.subjectRepository.getCorrelatives(dto.subjectId, userId);

        if (requirements && requirements.length > 0) {

            for (const req of requirements) {
                const priorEnrollment = await this.enrollRepository.findEnrollmentByUserAndSubject(userId, req.requiredSubject.id);

                if (req.type === EnrollmentStatus.APPROVED) {
                    if (!priorEnrollment || priorEnrollment.status !== EnrollmentStatus.APPROVED) {
                        throw new BadRequestException(`Prerequisite not met: You need APPROVED status in ${req.requiredSubject.name}`);
                    }
                }

                if (req.type === EnrollmentStatus.REGULAR) {
                    const hasRequiredStatus = priorEnrollment && (
                        priorEnrollment.status === EnrollmentStatus.REGULAR ||
                        priorEnrollment.status === EnrollmentStatus.APPROVED ||
                        priorEnrollment.status === EnrollmentStatus.PROMOTED
                    );

                    if (!hasRequiredStatus) {
                        throw new BadRequestException(`Prerequisite not met: You need REGULAR status in ${req.requiredSubject.name}`);
                    }
                }
            }
        }

        return await this.enrollRepository.enrollUserInSubject({
            userId,
            subjectId: dto.subjectId,
            academicYear: dto.academicYear,
            status: EnrollmentStatus.STUDYING,
        });
    }
}