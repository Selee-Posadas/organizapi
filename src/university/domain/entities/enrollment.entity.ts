import { EnrollmentStatus } from '../enums/enrollment-status.enum';

export class Enrollment {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly subjectId: string,
    public readonly status: EnrollmentStatus,
    public readonly academicYear: number,
    public readonly finalGrade?: number | null,
    public readonly createdAt?: Date,
  ) {
    this.validateGrade();
  }

  private validateGrade() {
    if (this.finalGrade !== undefined && this.finalGrade !== null) {
      if (this.finalGrade < 0 || this.finalGrade > 10) {
        throw new Error('Grade must be between 0 and 10');
      }
    }
  }

  public isApproved(): boolean {
    return this.status === EnrollmentStatus.APPROVED;
  }
}