import { Career } from '../../domain/entities/career.entity';
import { Subject } from '../../domain/entities/subject.entity';
import { Enrollment } from '../../domain/entities/enrollment.entity';
import { EnrollmentStatus } from '../../domain/enums/enrollment-status.enum';
import { AcademicEvaluation } from 'src/university/domain/entities/academic-evaluation.entity';
import { EvaluationType } from 'src/university/domain/enums/evaluation-type.enum';
import { Schedule } from 'src/university/domain/entities/schedule.entity';
import { ScheduleType } from 'src/university/domain/enums/schedule-type.enum';
import { Contact } from 'src/university/domain/entities/contact.entity';
import { ContactWithSubjectDto } from 'src/university/dto/contact/contact-with-subject.dto';
import { StudyType } from 'src/university/domain/enums/study-type.enum';

export class UniversityMapper {

  static toDomainCareer(raw: any): Career {
    return new Career(
      raw.id,
      raw.name,
      raw.userId,
      raw.institution,
      raw.type as StudyType,
      raw.whatsappGroup,
      raw.facultyContactInfo
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

  static toDomainContact(raw: any): Contact {
    return new Contact(
      raw.id,
      raw.enrollmentId,
      raw.name,
      raw.role,
      raw.email,
      raw.phone,
      raw.whatsappLink,
      raw.notes
    );
  }

  static toResponseContactDto(raw: any): ContactWithSubjectDto {
    return {
      id: raw.id,
      name: raw.name,
      role: raw.role,
      email: raw.email,
      phone: raw.phone,
      whatsappLink: raw.whatsappLink,
      notes: raw.notes,
      subjectName: raw.enrollment?.subject?.name || 'Sin materia'
    };
  }

}