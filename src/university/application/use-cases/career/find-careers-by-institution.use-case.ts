import { BadRequestException, Inject } from '@nestjs/common';
import { Career } from 'src/university/domain/entities/career.entity';
import { StudyType } from 'src/university/domain/enums/study-type.enum';
import type { CareerRepository } from 'src/university/domain/repositories/career.repository';

export class FindCareersByInstitutionUseCase {
  constructor(
    @Inject('CareerRepository')
    private readonly careerRepository: CareerRepository,
  ) {}
  async execute(institution: string, userId: string): Promise<Career[]> {
    if (!institution) {
      throw new BadRequestException('Career institution is required');
    }
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }
    return await this.careerRepository.findCareersByIntitution(
      institution,
      userId,
    );
  }
}
