import { Career } from '../entities/career.entity';
import { Subject } from '../entities/subject.entity';
import { Enrollment } from '../entities/enrollment.entity';

export interface UniversityRepository {
  createCareer(career: Partial<Career>): Promise<Career>;
  updateCareer(id: string, userId: string, data: Partial<Career>): Promise<Career>;
  findCareerById(id: string, userId: string): Promise<Career | null>;
  findCareerByName(careerName: string, userId: string): Promise<Career | null>;


  createSubject(subject: Partial<Subject>): Promise <Subject>;
  updateSubject(id: string, userId: string, data: Partial<Subject>): Promise <Subject>;
  findSubjectsByCareer(careerId: string, userId: string): Promise<Subject[]>;
  findSubjectById(id: string, userId: string): Promise<Subject | null>;
  findSubjectByName(subjectName: string, userId: string): Promise <Subject | null>;

  enrollUserInSubject(enrollment: Enrollment): Promise<Enrollment>;
  updateEnrollment(id: string, userId: string, data: Partial<Enrollment>): Promise<Enrollment>;
  findUserEnrollments(userId: string): Promise<Enrollment[]>;
}