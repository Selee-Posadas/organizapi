
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import type { EvaluationRepository } from 'src/university/domain/repositories/evaluation.repository';

export class DeleteEvaluationUseCase {
    constructor(
        @Inject('EvaluationRepository')
        private readonly evaluationRepo: EvaluationRepository
    ) { }

    async execute(id: string, userId: string): Promise<void> {

        if (!id) {
            throw new BadRequestException('Evaluation data is required');
        }
        if (!userId) {
            throw new BadRequestException('User authentication is required');
        }



        const deleting = await this.evaluationRepo.findEvaluationById(id, userId);

        if (!deleting) {
            throw new NotFoundException('Evaluation not found');
        }

        await this.evaluationRepo.deleteEvaluation(id, userId);

    }
}