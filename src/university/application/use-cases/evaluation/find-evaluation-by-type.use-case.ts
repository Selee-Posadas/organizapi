import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AcademicEvaluation } from 'src/university/domain/entities/academic-evaluation.entity';
import { EvaluationType } from 'src/university/domain/enums/evaluation-type.enum';
import type { EvaluationRepository } from 'src/university/domain/repositories/evaluation.repository';

@Injectable()
export class FindEvaluationByTypeUseCase {
  constructor(
    @Inject('EvaluationRepository') private readonly repo: EvaluationRepository,
  ) {}
  async execute(
    type: EvaluationType,
    userId: string,
  ): Promise<AcademicEvaluation[]> {
    if (!userId) throw new BadRequestException('User ID is required');
    if (!EvaluationType)
      throw new BadRequestException('Evaluation type is required');

    return await this.repo.findEvaluationByType(type, userId);
  }
}
