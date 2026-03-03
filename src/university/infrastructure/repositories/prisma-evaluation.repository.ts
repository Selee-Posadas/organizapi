import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { AcademicEvaluation } from "src/university/domain/entities/academic-evaluation.entity";
import { EvaluationRepository } from "src/university/domain/repositories/evaluation.repository";
import { UniversityMapper } from "../mappers/university.mapper";

@Injectable()
export class PrismaEvaluationRepository implements EvaluationRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createEvaluation(data: Partial<AcademicEvaluation>, userId: string): Promise<AcademicEvaluation> {
        const created = await this.prisma.academicEvaluation.create({
            data: {
                enrollmentId: data.enrollmentId!,
                type: data.type!,
                date: data.date!,
                status: data.status!,
                topics: data.topics,
                grade: data.grade,
                reflection: data.reflection,
            }
        });
        return UniversityMapper.toDomainEvaluation(created);
    }

    async updateEvaluation(id: string, userId: string, data: Partial<AcademicEvaluation>): Promise<AcademicEvaluation> {
        const updated = await this.prisma.academicEvaluation.update({
            where: { id, enrollment: { userId: userId } },
            data: { ...data }
        });
        return UniversityMapper.toDomainEvaluation(updated);
    }

    async findByEnrollment(enrollmentId: string, userId: string): Promise<AcademicEvaluation[]> {
        const evaluations = await this.prisma.academicEvaluation.findMany({
            where: { enrollmentId,
                enrollment: { userId: userId }
             }
        });
        return evaluations.map(UniversityMapper.toDomainEvaluation);
    }
}