import { AcademicEvaluation } from "../entities/academic-evaluation.entity";

export interface EvaluationRepository {
  createEvaluation(data: Partial<AcademicEvaluation>,  userId:string): Promise<AcademicEvaluation>;
  updateEvaluation(id: string, userId:string, data: Partial<AcademicEvaluation>): Promise<AcademicEvaluation>;
  findByEnrollment( enrollmentId: string,  userId:string): Promise<AcademicEvaluation[]>;
}