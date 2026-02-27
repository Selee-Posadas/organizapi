import { Career } from '../../domain/entities/career.entity';
import { Subject } from '../../domain/entities/subject.entity';
import { Enrollment } from '../../domain/entities/enrollment.entity';
import { EnrollmentStatus } from '../../domain/enums/enrollment-status.enum';

export class UniversityMapper {

  static toDomainCareer(raw: any): Career {
    return new Career(
      raw.id,
      raw.name
    );
  }

  static toDomainSubject(raw: any): Subject {
    return new Subject(
      raw.id,
      raw.careerId,
      raw.name,
      raw.yearLevel,
      raw.semester
    );
  }

  static toDomainEnrollment(raw: any): Enrollment {
    return new Enrollment(
      raw.id,
      raw.userId,
      raw.subjectId,
      raw.status as EnrollmentStatus,
      raw.academicYear,
      raw.finalGrade,
      raw.createdAt
    );
  }
}