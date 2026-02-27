import { Career } from "../entities/career.entity";

export interface CareerRepository {
  createCareer(career: Partial<Career> & { userId: string }): Promise<Career>;
  updateCareer(id: string, userId: string, data: Partial<Career>): Promise<Career>;
  findCareerById(id: string, userId: string): Promise<Career | null>;
  findCareerByName(name: string, userId: string): Promise<Career | null>;
}