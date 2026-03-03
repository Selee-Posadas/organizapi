import { Inject, Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import type { EvaluationRepository } from '../../domain/repositories/evaluation.repository';
import type { EnrollmentRepository } from '../../domain/repositories/enrollment.repository';
import { AcademicEvaluation } from '../../domain/entities/academic-evaluation.entity';
import { CreateEvaluationDto } from '../../dto/create-evaluation.dto';

@Injectable()
export class CreateEvaluationUseCase {
    constructor(
        private readonly evaluationRepo: EvaluationRepository,
        private readonly enrollmentRepo: EnrollmentRepository,
    ) { }

    async execute(dto: CreateEvaluationDto, userId: string): Promise<AcademicEvaluation> {
       
        const enrollment = await this.enrollmentRepo.findEnrollmentById(dto.enrollmentId, userId);
        
        if (!enrollment) {
            throw new NotFoundException('Enrollment not found or you do not have permission');
        }


        return await this.evaluationRepo.createEvaluation({
            enrollmentId: dto.enrollmentId,
            type: dto.type,
            date: new Date(dto.date),
            status: dto.status,
            topics: dto.topics,
            grade: dto.grade,
            reflection: dto.reflection
        },  userId
    );
    }
}