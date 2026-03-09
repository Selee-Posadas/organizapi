import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Enrollment } from 'src/university/domain/entities/enrollment.entity';
import type { EnrollmentRepository } from 'src/university/domain/repositories/enrollment.repository';
import { UpdateEnrollmentDto } from 'src/university/dto/enrollment/update-enrollment.dto';

@Injectable()
export class UpdateEnrollmentUseCase {
  constructor(
    @Inject('EnrollmentRepository')
    private readonly enrollRepository: EnrollmentRepository,
  ) {}

  async execute(
    id: string,
    userId: string,
    dto: UpdateEnrollmentDto,
  ): Promise<Enrollment> {
    if (!id) {
      throw new BadRequestException('Enroll ID is required');
    }
    if (!dto) {
      throw new BadRequestException('Enroll data is required');
    }
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }

    const enrolled = await this.enrollRepository.findEnrollmentById(id, userId);

    if (!enrolled) {
      throw new NotFoundException('Enrollment not found');
    }

    if (
      dto.finalGrade !== undefined &&
      (dto.finalGrade < 0 || dto.finalGrade > 10)
    ) {
      throw new BadRequestException('Grade must be between 0 and 10');
    }

    return await this.enrollRepository.updateEnrollment(id, userId, {
      ...dto,
    });
  }
}
