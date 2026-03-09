import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Enrollment } from 'src/university/domain/entities/enrollment.entity';
import type { EnrollmentRepository } from 'src/university/domain/repositories/enrollment.repository';

@Injectable()
export class FindEnrollmentBySubjectUseCase {
  constructor(
    @Inject('EnrollmentRepository')
    private readonly enrollRepository: EnrollmentRepository,
  ) {}

  async execute(subjectId: string, userId: string): Promise<Enrollment | null> {
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }
    if (!subjectId) {
      throw new BadRequestException('Subject ID is required');
    }

    return await this.enrollRepository.findEnrollmentBySubject(
      subjectId,
      userId,
    );
  }
}
