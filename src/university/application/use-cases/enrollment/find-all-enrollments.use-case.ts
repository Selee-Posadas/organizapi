import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Enrollment } from 'src/university/domain/entities/enrollment.entity';
import type { EnrollmentRepository } from 'src/university/domain/repositories/enrollment.repository';

@Injectable()
export class FindAllEnrollmentsUseCase {
  constructor(
    @Inject('EnrollmentRepository')
    private readonly enrollRepository: EnrollmentRepository,
  ) {}

  async execute(userId: string): Promise<Enrollment[]> {
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }

    return await this.enrollRepository.findAllEnrollments(userId);
  }
}
