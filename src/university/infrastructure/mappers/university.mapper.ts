import { Career } from '../../domain/entities/career.entity';
import { Subject } from '../../domain/entities/subject.entity';
import { Enrollment } from '../../domain/entities/enrollment.entity';
import { EnrollmentStatus } from '../../domain/enums/enrollment-status.enum';
import { AcademicEvaluation } from 'src/university/domain/entities/academic-evaluation.entity';
import { EvaluationType } from 'src/university/domain/enums/evaluation-type.enum';
import { Schedule } from 'src/university/domain/entities/schedule.entity';
import { ScheduleType } from 'src/university/domain/enums/schedule-type.enum';

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
      raw.semester,
      raw.credits
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

  static toDomainEvaluation(raw: any): AcademicEvaluation {
    return new AcademicEvaluation(
      raw.id,
      raw.enrollmentId,
      raw.type as EvaluationType,
      raw.date,
      raw.status,
      raw.topics,
      raw.grade,
      raw.reflection
    );
  }

  static toDomainSchedule(raw: any): Schedule {
    return new Schedule(
      raw.id,
      raw.enrollmentId,
      raw.dayOfWeek,
      raw.startTime,
      raw.endTime,
      raw.type as ScheduleType,
      raw.location
    );
  }

}