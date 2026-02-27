import { Enrollment } from "../entities/enrollment.entity";

export interface EnrollmentRepository {
  enrollUserInSubject(enrollment: Partial<Enrollment>): Promise<Enrollment>;
  updateEnrollment(id: string, userId: string, data: Partial<Enrollment>): Promise<Enrollment>;
  findUserEnrollments(userId: string): Promise<Enrollment[]>;
  findEnrollmentByUserAndSubject(userId: string, subjectId: string): Promise<Enrollment | null>;
}