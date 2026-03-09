import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AcademicEvaluation } from 'src/university/domain/entities/academic-evaluation.entity';
import type { EvaluationRepository } from 'src/university/domain/repositories/evaluation.repository';

@Injectable()
export class FindEvaluationByIdUseCase {
  constructor(
    @Inject('EvaluationRepository') private readonly repo: EvaluationRepository,
  ) {}

  async execute(
    id: string,
    userId: string,
  ): Promise<AcademicEvaluation | null> {
    if (!userId) throw new BadRequestException('User ID is required');
    if (!id) throw new BadRequestException('Evaluation ID is required');

    const result = await this.repo.findEvaluationById(id, userId);

    if (!result) throw new NotFoundException('Evaluation not found');

    return result;
  }
}
