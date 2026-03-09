import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AcademicEvaluation } from 'src/university/domain/entities/academic-evaluation.entity';
import type { EvaluationRepository } from 'src/university/domain/repositories/evaluation.repository';

@Injectable()
export class FindEvaluationByDayUseCase {
  constructor(
    @Inject('EvaluationRepository') private readonly repo: EvaluationRepository,
  ) {}
  async execute(date: Date, userId: string): Promise<AcademicEvaluation[]> {
    if (!userId) throw new BadRequestException('User ID is required');
    if (!date) throw new BadRequestException('Evaluation Date is required');

    return await this.repo.findEvaluationByDay(date, userId);
  }
}
