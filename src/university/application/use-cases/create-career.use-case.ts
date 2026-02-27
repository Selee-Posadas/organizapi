import { Career } from '../../domain/entities/career.entity';
import { CareerRepository } from '../../domain/repositories/career.repository';
import { CreateCareerDto } from '../../dto/create-career.dto';

export class CreateCareerUseCase {
  constructor(private readonly careerRepository: CareerRepository) {}

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