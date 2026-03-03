import { Injectable, NotFoundException } from '@nestjs/common';
import { Enrollment } from 'src/university/domain/entities/enrollment.entity';
import { UpdateEnrollmentDto } from '../../dto/update-enrollment.dto';
import type { EnrollmentRepository } from '../../domain/repositories/enrollment.repository';


@Injectable()
export class UpdateEnrollmentUseCase {
    constructor(
        private readonly enrollRepository: EnrollmentRepository,
    ) { }

    async execute(id: string, userId: string, dto: UpdateEnrollmentDto): Promise<Enrollment> {
        const enrollments = await this.enrollRepository.findUserEnrollments(userId);
        const exists = enrollments.find(e => e.id === id);
        
        if (!exists) {
            throw new NotFoundException('Enrollment not found or access denied');
        }

        return await this.enrollRepository.updateEnrollment(id, userId, {
            status: dto.status,
            finalGrade: dto.finalGrade,
            academicYear: dto.academicYear
        });
    }
}