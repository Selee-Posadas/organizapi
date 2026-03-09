import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { Career } from 'src/university/domain/entities/career.entity';
import type { CareerRepository } from 'src/university/domain/repositories/career.repository';

export class UpdateCareerUseCase {
  constructor(
    @Inject('CareerRepository')
    private readonly careerRepository: CareerRepository,
  ) {}
  async execute(
    id: string,
    userId: string,
    data: Partial<Career>,
  ): Promise<Career> {
    if (!id) {
      throw new BadRequestException('Career ID is required');
    }
    if (!data) {
      throw new BadRequestException('Career data is required');
    }
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }

    const update = await this.careerRepository.findCareerById(id, userId);

    if (!update) {
      throw new NotFoundException('Career not found or access denied');
    }

    return await this.careerRepository.updateCareer(id, userId, { ...data });
  }
}
