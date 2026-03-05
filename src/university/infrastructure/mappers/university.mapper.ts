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
import { EnrollmentWithDetailsDto } from 'src/university/dto/enrollment/enrollment-with-details.dto';
import { ScheduleWithDetailsDto } from 'src/university/dto/schedule/schedule-with-details.dto';
import { EvaluationWithDetailsDto } from 'src/university/dto/evaluation/evaluation-with-details.dto';

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

  static toResponseEnrollmentDto(raw: any): EnrollmentWithDetailsDto {
    return {
        id: raw.id,
        status: raw.status as EnrollmentStatus,
        academicYear: raw.academicYear,
        finalGrade: raw.finalGrade,
        subjectName: raw.subject?.name || 'Unknown Subject',
        careerName: raw.subject?.career?.name || 'Unknown Career'
    };
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

  static toResponseEvaluationDto(raw: any): EvaluationWithDetailsDto {
  return {
    id: raw.id,
    enrollmentId: raw.enrollmentId,
    type: raw.type as EvaluationType,
    date: raw.date,
    status: raw.status,
    topics: raw.topics,
    grade: raw.grade,
    reflection: raw.reflection,
    subjectName: raw.enrollment?.subject?.name || 'Unknown Subject',
    careerName: raw.enrollment?.subject?.career?.name || 'Unknown Career',
  };
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

  static toResponseScheduleDto(raw: any): ScheduleWithDetailsDto {
  return {
    id: raw.id,
    enrollmentId: raw.enrollmentId,
    dayOfWeek: raw.dayOfWeek,
    startTime: raw.startTime,
    endTime: raw.endTime,
    type: raw.type as ScheduleType,
    location: raw.location,
    subjectName: raw.enrollment?.subject?.name || 'Unknown Subject',
    careerName: raw.enrollment?.subject?.career?.name || 'Unknown Career',
  };
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
      subjectName: raw.enrollment?.subject?.name || 'Unknown Subject'
    };
  }

}