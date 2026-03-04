import { Inject } from '@nestjs/common';
import { Career } from 'src/university/domain/entities/career.entity';
import { CareerRepository } from 'src/university/domain/repositories/career.repository';
import { CreateCareerDto } from 'src/university/dto/career/create-career.dto';

export class CreateCareerUseCase {
  constructor(
    private readonly careerRepository: CareerRepository
  ) {}

  async execute(dto: CreateCareerDto, userId: string): Promise<Career> {
    const existing = await this.careerRepository.findCareerByName(dto.name, userId);
    
    if (existing) {
      throw new Error('The career already exist');
    }


    return await this.careerRepository.createCareer({
      name: dto.name,
      userId: userId,
    });
  }
}