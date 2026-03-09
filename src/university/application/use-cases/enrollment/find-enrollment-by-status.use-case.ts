import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Enrollment } from 'src/university/domain/entities/enrollment.entity';
import { EnrollmentStatus } from 'src/university/domain/enums/enrollment-status.enum';
import type { EnrollmentRepository } from 'src/university/domain/repositories/enrollment.repository';

@Injectable()
export class FindEnrollmentByStatusUseCase {
  constructor(
    @Inject('EnrollmentRepository')
    private readonly enrollRepository: EnrollmentRepository,
  ) {}

  async execute(
    status: EnrollmentStatus,
    userId: string,
  ): Promise<Enrollment[]> {
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }
    if (!status) {
      throw new BadRequestException('Status enrollment is required');
    }

    return await this.enrollRepository.findEnrollmentByStatus(status, userId);
  }
}
