import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { EnrollmentRepository } from 'src/university/domain/repositories/enrollment.repository';



@Injectable()
export class DeleteEnrollmentUseCase {
    constructor(
        @Inject('EnrollmentRepository')
        private readonly enrollRepository: EnrollmentRepository,
    ) { }

    async execute(id: string, userId: string): Promise<void> {

        if (!id) {
            throw new BadRequestException('Enroll ID is required');
        }
        if (!userId) {
            throw new BadRequestException('User authentication is required');
        }

        const enrolled = await this.enrollRepository.findEnrollmentById(id, userId);

        if (!enrolled) {
            throw new NotFoundException('Enrollment not found');
        }

        await this.enrollRepository.deleteEnrollment(id, userId);
    }
}