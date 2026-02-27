import { Subject } from "../entities/subject.entity";

export interface SubjectRepository {
  createSubject(subject: Partial<Subject>): Promise<Subject>;
  updateSubject(id: string, userId: string, data: Partial<Subject>): Promise<Subject>;
  findSubjectsByCareer(careerId: string, userId: string): Promise<Subject[]>;
  findSubjectById(id: string, userId: string): Promise<Subject | null>;
  findSubjectByName(name: string, userId: string): Promise<Subject | null>;
}