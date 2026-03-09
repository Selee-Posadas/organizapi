import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Enrollment } from 'src/university/domain/entities/enrollment.entity';
import type { EnrollmentRepository } from 'src/university/domain/repositories/enrollment.repository';

@Injectable()
export class FindEnrollmentByYearUseCase {
  constructor(
    @Inject('EnrollmentRepository')
    private readonly enrollRepository: EnrollmentRepository,
  ) {}

  async execute(AcademicYear: number, userId: string): Promise<Enrollment[]> {
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }
    if (!AcademicYear) {
      throw new BadRequestException('Academic Year is required');
    }

    return await this.enrollRepository.findEnrollmentByYear(
      AcademicYear,
      userId,
    );
  }
}
