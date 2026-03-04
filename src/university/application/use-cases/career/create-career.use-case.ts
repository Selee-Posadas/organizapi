import { BadRequestException, ConflictException, Inject } from '@nestjs/common';
import { Career } from 'src/university/domain/entities/career.entity';
import type { CareerRepository } from 'src/university/domain/repositories/career.repository';
import { CreateCareerDto } from 'src/university/dto/career/create-career.dto';

export class CreateCareerUseCase {
  constructor(
    @Inject('CareerRepository')
    private readonly careerRepository: CareerRepository
  ) { }

  async execute(dto: CreateCareerDto, userId: string): Promise<Career> {

    if (!dto) {
      throw new BadRequestException('Career data is required');
    }
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }

    const existing = await this.careerRepository.findCareersByName(dto.name, userId);

    if (existing.length > 0) {
      throw new ConflictException('Career already exist');
    }


    return await this.careerRepository.createCareer({
      ...dto,
      userId: userId,
    });
  }
}