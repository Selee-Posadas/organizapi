import { EnrollmentStatus } from "../enums/enrollment-status.enum";
import { SubjectType } from "../enums/subject-type.enum";

export interface SubjectCorrelativeInfo {
  requiredSubjectId: string;
  name?: string; 
  type: EnrollmentStatus.REGULAR | EnrollmentStatus.APPROVED; 
}

export class Subject {
  constructor(
    public readonly id: string,
    public readonly careerId: string,
    public readonly name: string,
    public readonly yearLevel: number,
    public readonly semester: SubjectType,
    public readonly credits: number = 0,
    public readonly correlatives: SubjectCorrelativeInfo[] = []
  ) {
    if (yearLevel < 1) throw new Error('Year level must be positive');
    if (credits < 0) throw new Error('Credits cannot be negative');
    if (!Object.values(SubjectType).includes(semester)) {
      throw new Error('Invalid semester type (0, 1 or 2)');
    }
  }
}