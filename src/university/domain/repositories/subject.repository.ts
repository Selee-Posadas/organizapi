import { Subject } from "../entities/subject.entity";
import { EnrollmentStatus } from "../enums/enrollment-status.enum";

export interface CorrelativeResult {
  requiredSubject: Subject;
  type: EnrollmentStatus.REGULAR | EnrollmentStatus.APPROVED;
}
export interface SubjectRepository {
  createSubject(subject: Partial<Subject>): Promise<Subject>;
  updateSubject(id: string, userId: string, data: Partial<Subject>): Promise<Subject>;
  deleteSubject(id: string, userId: string): Promise<void>;

  findSubjectById(id: string, userId: string): Promise<Subject | null>;
  findSubjectByName(name: string, userId: string): Promise<Subject | null>;
  findSubjectsByCareer(careerId: string, userId: string): Promise<Subject[]>;
  getCorrelatives(subjectId: string, userId:string): Promise<CorrelativeResult[]>;

  addCorrelative(subjectId: string, requiredSubjectId: string, type: EnrollmentStatus.REGULAR | EnrollmentStatus.APPROVED, userId: string):Promise<void>;
  removeCorrelative(subjectId: string, requiredSubjectId:string, userId:string):Promise<void>;
}