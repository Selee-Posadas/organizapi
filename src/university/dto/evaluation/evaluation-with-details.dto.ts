import { EvaluationType } from '../../domain/enums/evaluation-type.enum';

export class EvaluationWithDetailsDto {
  id: string;
  enrollmentId: string;
  subjectName: string;
  careerName: string;
  type: EvaluationType;
  date: Date;
  status: string;
  topics?: string | null;
  grade?: number | null;
  reflection?: string | null;
}
