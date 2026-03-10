import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AcademicEvaluation } from 'src/university/domain/entities/academic-evaluation.entity';
import type { EvaluationRepository } from 'src/university/domain/repositories/evaluation.repository';

@Injectable()
export class GetUpcomingEvaluationsUseCase {
  constructor(
    @Inject('EvaluationRepository')
    private readonly evaluationRepo: EvaluationRepository,
  ) {}

  async execute(userId: string): Promise<AcademicEvaluation[]> {
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }

    const allEvaluations = await this.evaluationRepo.findAllEvaluation(userId);

    const now = new Date();
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    return allEvaluations.filter((evaluation) => {
      const evalDate = new Date(evaluation.date);
      return evalDate >= now && evalDate <= sevenDaysFromNow;
    });
  }
}
