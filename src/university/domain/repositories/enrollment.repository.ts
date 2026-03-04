import { Enrollment } from "../entities/enrollment.entity";
import { EnrollmentStatus } from "../enums/enrollment-status.enum";
import { EnrollmentWithDetailsDto } from '../../dto/enrollment/enrollment-with-details.dto';

export interface EnrollmentRepository {
  enrollUserInSubject(enrollment: Partial<Enrollment>): Promise<Enrollment>;
  updateEnrollment(id: string, userId: string, data: Partial<Enrollment>): Promise<Enrollment>;
  deleteEnrollment(id: string, userId: string): Promise<void>;

  findEnrollmentById(id: string, userId: string): Promise<Enrollment | null>;
  findAllEnrollments(userId: string): Promise<Enrollment[]>;
  findAllEnrollmentsWithDetails(userId: string): Promise<EnrollmentWithDetailsDto[]>;
  findEnrollmentBySubject(subjectId: string, userId: string): Promise<Enrollment | null>;
  findEnrollmentByStatus(status: EnrollmentStatus, userId: string): Promise<Enrollment[]>;
  findEnrollmentByYear(AcademicYear: number, userId: string): Promise<Enrollment[]>;
}