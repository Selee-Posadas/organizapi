import { Career } from "../entities/career.entity";
import { StudyType } from "../enums/study-type.enum";

export interface CareerRepository {
  createCareer(career: Partial<Career> & { userId: string }): Promise<Career>;
  updateCareer(id: string, userId: string, data: Partial<Career>): Promise<Career>;
  deleteCareer(id: string, userId: string): Promise<void>;
  findCareerById(id: string, userId: string): Promise<Career | null>;
  findCareersByName(name: string, userId: string): Promise<Career[]>;
  findAllCareers(userId: string): Promise<Career[]>;
  findCareersByType(studyType: StudyType, userId: string): Promise<Career[]>;
  findCareersByIntitution(institution: string, userId: string): Promise<Career[]>;
}