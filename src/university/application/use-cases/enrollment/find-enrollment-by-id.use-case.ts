import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Enrollment } from 'src/university/domain/entities/enrollment.entity';
import type { EnrollmentRepository } from 'src/university/domain/repositories/enrollment.repository';

@Injectable()
export class FindEnrollmentByIdUseCase {
  constructor(
    @Inject('EnrollmentRepository')
    private readonly enrollRepository: EnrollmentRepository,
  ) {}

  async execute(id: string, userId: string): Promise<Enrollment | null> {
    if (!id) {
      throw new BadRequestException('Enroll ID is required');
    }
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }

    return await this.enrollRepository.findEnrollmentById(id, userId);
  }
}
