
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { AcademicEvaluation } from 'src/university/domain/entities/academic-evaluation.entity';
import type { EvaluationRepository } from 'src/university/domain/repositories/evaluation.repository';
import { UpdateEvaluationDto } from 'src/university/dto/evaluation/update-evaluation.dto';

export class UpdateEvaluationUseCase {
    constructor(
        @Inject('EvaluationRepository')
        private readonly evaluationRepo: EvaluationRepository
    ) { }

    async execute(id: string, userId: string, dto: UpdateEvaluationDto): Promise<AcademicEvaluation> {

        if (!dto) {
            throw new BadRequestException('Evaluation data is required');
        }
        if (!userId) {
            throw new BadRequestException('User authentication is required');
        }


        const updateData: Partial<AcademicEvaluation> = {
            ...dto,
            date: dto.date ? new Date(dto.date) : undefined
        };

        const updating = await this.evaluationRepo.findEvaluationById(id, userId);

        if (!updating) {
            throw new NotFoundException('Evaluation not found');
        }

        return await this.evaluationRepo.updateEvaluation(id, userId, updateData);

    }
}