import { EvaluationWithDetailsDto } from 'src/university/dto/evaluation/evaluation-with-details.dto';
import { AcademicEvaluation } from '../entities/academic-evaluation.entity';
import { EvaluationType } from '../enums/evaluation-type.enum';

export interface EvaluationRepository {
  createEvaluation(
    data: Partial<AcademicEvaluation>,
    userId: string,
  ): Promise<AcademicEvaluation>;
  updateEvaluation(
    id: string,
    userId: string,
    data: Partial<AcademicEvaluation>,
  ): Promise<AcademicEvaluation>;
  deleteEvaluation(id: string, userId: string): Promise<void>;

  findEvaluationById(
    id: string,
    userId: string,
  ): Promise<AcademicEvaluation | null>;
  findAllEvaluation(userId: string): Promise<AcademicEvaluation[]>;
  findAllEvaluationWithDetails(
    userId: string,
  ): Promise<EvaluationWithDetailsDto[]>;
  findEvaluationByType(
    type: EvaluationType,
    userId: string,
  ): Promise<AcademicEvaluation[]>;
  findEvaluationByDay(
    date: Date,
    userId: string,
  ): Promise<AcademicEvaluation[]>;
  findEvaluationByStatus(
    status: string,
    userId: string,
  ): Promise<AcademicEvaluation[]>;

  findEvaluationByEnrollment(
    enrollmentId: string,
    userId: string,
  ): Promise<AcademicEvaluation[]>;
}
