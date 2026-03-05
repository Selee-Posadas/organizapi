import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { AcademicEvaluation } from "src/university/domain/entities/academic-evaluation.entity";
import type { EvaluationRepository } from "src/university/domain/repositories/evaluation.repository";

@Injectable()
export class FindAllEvaluationUseCase {
    constructor(@Inject('EvaluationRepository') private readonly repo: EvaluationRepository) { }
    async execute(userId: string): Promise<AcademicEvaluation[]> {

        if (!userId) throw new BadRequestException('User ID is required');
       
        return await this.repo.findAllEvaluation(userId);
    }
}