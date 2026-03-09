import { BadRequestException, Inject } from '@nestjs/common';
import { Career } from 'src/university/domain/entities/career.entity';
import { StudyType } from 'src/university/domain/enums/study-type.enum';
import type { CareerRepository } from 'src/university/domain/repositories/career.repository';

export class FindCareersByTypeUseCase {
  constructor(
    @Inject('CareerRepository')
    private readonly careerRepository: CareerRepository,
  ) {}
  async execute(studyType: StudyType, userId: string): Promise<Career[]> {
    if (!studyType) {
      throw new BadRequestException('Career type is required');
    }
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }
    return await this.careerRepository.findCareersByType(studyType, userId);
  }
}
