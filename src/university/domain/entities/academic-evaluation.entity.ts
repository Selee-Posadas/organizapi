export class AcademicEvaluation {
  constructor(
    public readonly id: string,
    public readonly enrollmentId: string,
    public readonly type: string,
    public readonly date: Date,
    public readonly topics: string | null,
    public readonly grade: number | null,
    public readonly status: string,
    public readonly reflection: string | null
  ) {}
}