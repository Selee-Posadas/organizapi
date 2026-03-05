import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { AcademicEvaluation } from 'src/university/domain/entities/academic-evaluation.entity';
import type { EnrollmentRepository } from 'src/university/domain/repositories/enrollment.repository';
import type { EvaluationRepository } from 'src/university/domain/repositories/evaluation.repository';
import { CreateEvaluationDto } from 'src/university/dto/evaluation/create-evaluation.dto';

@Injectable()
export class CreateEvaluationUseCase {
    constructor(
        @Inject('EvaluationRepository')
        private readonly evaluationRepo: EvaluationRepository,
        @Inject('EnrollmentRepository')
        private readonly enrollmentRepo: EnrollmentRepository,
    ) { }

    async execute(dto: CreateEvaluationDto, userId: string): Promise<AcademicEvaluation> {


        if (!dto) {
            throw new BadRequestException('Evaluation data is required');
        }
        if (!userId) {
            throw new BadRequestException('User authentication is required');
        }

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
        }, userId
        );
    }
}