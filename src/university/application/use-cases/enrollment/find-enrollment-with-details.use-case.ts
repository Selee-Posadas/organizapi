import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import type { EnrollmentRepository } from 'src/university/domain/repositories/enrollment.repository';
import { EnrollmentWithDetailsDto } from 'src/university/dto/enrollment/enrollment-with-details.dto';

@Injectable()
export class FindAllEnrollmentsWithDetailsUseCase {
    constructor(
        @Inject('EnrollmentRepository')
        private readonly enrollRepository: EnrollmentRepository,
    ) { }

    async execute(userId: string): Promise<EnrollmentWithDetailsDto[]> {
        if (!userId) {
            throw new BadRequestException('User authentication is required to fetch academic details');
        }

        return await this.enrollRepository.findAllEnrollmentsWithDetails(userId);
    }
}