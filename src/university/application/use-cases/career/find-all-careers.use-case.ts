import { BadRequestException, Inject } from '@nestjs/common';
import { Career } from 'src/university/domain/entities/career.entity';
import type { CareerRepository } from 'src/university/domain/repositories/career.repository';

export class FindAllCareersUseCase {
  constructor(
    @Inject('CareerRepository')
    private readonly careerRepository: CareerRepository,
  ) {}
  async execute(userId: string): Promise<Career[]> {
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }
    return await this.careerRepository.findAllCareers(userId);
  }
}
