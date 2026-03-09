import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import type { EvaluationRepository } from 'src/university/domain/repositories/evaluation.repository';
import { EvaluationWithDetailsDto } from 'src/university/dto/evaluation/evaluation-with-details.dto';

@Injectable()
export class FindAllEvaluationWithDetailsUseCase {
  constructor(
    @Inject('EvaluationRepository') private readonly repo: EvaluationRepository,
  ) {}

  async execute(userId: string): Promise<EvaluationWithDetailsDto[]> {
    if (!userId) throw new BadRequestException('User ID is required');

    return await this.repo.findAllEvaluationWithDetails(userId);
  }
}
