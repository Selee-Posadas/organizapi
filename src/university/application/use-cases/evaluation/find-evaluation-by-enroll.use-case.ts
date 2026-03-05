import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { AcademicEvaluation } from "src/university/domain/entities/academic-evaluation.entity";
import type { EvaluationRepository } from "src/university/domain/repositories/evaluation.repository";

@Injectable()
export class FindEvaluationByEnrollmentUseCase {
    constructor(@Inject('EvaluationRepository') private readonly repo: EvaluationRepository) {}
    
    async execute(enrollmentId: string, userId: string) :Promise<AcademicEvaluation[]>{
        
        if (!userId) throw new BadRequestException('User ID is required');
        if (!enrollmentId) throw new BadRequestException('Enrollment ID is required');

        return await this.repo.findEvaluationByEnrollment(enrollmentId, userId);
    }
}