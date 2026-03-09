import { SubjectType } from '../../domain/enums/subject-type.enum';
import { EnrollmentStatus } from '../../domain/enums/enrollment-status.enum';

export class SubjectCorrelativeDetailDto {
  requiredSubjectId: string;
  name: string;
  type: EnrollmentStatus.REGULAR | EnrollmentStatus.APPROVED;
}

export class SubjectWithDetailsDto {
  id: string;
  careerId: string;
  name: string;
  yearLevel: number;
  semester: SubjectType;
  credits: number;
  correlatives: SubjectCorrelativeDetailDto[];
}
