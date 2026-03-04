import { AcademicEvaluation } from '../../domain/entities/academic-evaluation.entity';
import { EvaluationRepository } from '../../domain/repositories/evaluation.repository';
import { UpdateEvaluationDto } from '../../dto/update-evaluation.dto';
import { NotFoundException } from '@nestjs/common';

export class UpdateEvaluationUseCase {
    constructor(
        private readonly evaluationRepo: EvaluationRepository
    ) { }

    async execute(id: string, userId: string, dto: UpdateEvaluationDto): Promise<AcademicEvaluation> {
        const updateData: Partial<AcademicEvaluation> = {
            ...dto,
            date: dto.date ? new Date(dto.date) : undefined 
        };

        const updated = await this.evaluationRepo.updateEvaluation(id, userId, updateData);
        
        if (!updated) {
            throw new NotFoundException('Evaluation not found or access denied');
        }

        return updated;
    }
}