import { EvaluationType } from '../enums/evaluation-type.enum';

export class AcademicEvaluation {
  constructor(
    public readonly id: string,
    public readonly enrollmentId: string,
    public readonly type: EvaluationType,
    public readonly date: Date,
    public readonly status: string,
    public readonly topics?: string | null,
    public readonly grade?: number | null,
    public readonly reflection?: string | null,
  ) {}
}
