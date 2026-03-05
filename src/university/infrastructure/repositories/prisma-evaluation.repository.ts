import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { AcademicEvaluation } from "src/university/domain/entities/academic-evaluation.entity";
import { EvaluationRepository } from "src/university/domain/repositories/evaluation.repository";
import { UniversityMapper } from "../mappers/university.mapper";
import { EvaluationType } from "src/university/domain/enums/evaluation-type.enum";
import { EvaluationWithDetailsDto } from "src/university/dto/evaluation/evaluation-with-details.dto";

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
        await this.prisma.academicEvaluation.updateMany({
            where: {
                id,
                enrollment: { userId }
            },
            data: { ...data }
        });

        const updated = await this.findEvaluationById(id, userId);
        if (!updated) throw new Error('Evaluation not found or unauthorized');
        return updated;
    }

    async deleteEvaluation(id: string, userId: string): Promise<void> {
        const result = await this.prisma.academicEvaluation.deleteMany({
            where: {
                id,
                enrollment: { userId }
            }
        });
        if (result.count === 0) throw new Error('Evaluation not found or unauthorized');
    }

    async findEvaluationById(id: string, userId: string): Promise<AcademicEvaluation | null> {
        const result = await this.prisma.academicEvaluation.findFirst({
            where: {
                id,
                enrollment: { userId }
            }
        });
        return result ? UniversityMapper.toDomainEvaluation(result) : null;
    }

    async findAllEvaluation(userId: string): Promise<AcademicEvaluation[]> {
        const results = await this.prisma.academicEvaluation.findMany({
            where: { enrollment: { userId } }
        });
        return results.map(UniversityMapper.toDomainEvaluation);
    }

    async findAllEvaluationWithDetails(userId: string): Promise<EvaluationWithDetailsDto[]> {
        const results = await this.prisma.academicEvaluation.findMany({
            where: { enrollment: { userId } },
            include: {
                enrollment: {
                    include: {
                        subject: {
                            include: { career: true }
                        }
                    }
                }
            },
            orderBy: { date: 'desc' }
        });
        return results.map(res => UniversityMapper.toResponseEvaluationDto(res));
    }

    async findEvaluationByType(type: EvaluationType, userId: string): Promise<AcademicEvaluation[]> {
        const results = await this.prisma.academicEvaluation.findMany({
            where: { type, enrollment: { userId } }
        });
        return results.map(UniversityMapper.toDomainEvaluation);
    }

    async findEvaluationByDay(date: Date, userId: string): Promise<AcademicEvaluation[]> {
        const results = await this.prisma.academicEvaluation.findMany({
            where: {
                date: {
                    gte: new Date(date.setHours(0, 0, 0, 0)),
                    lt: new Date(date.setHours(23, 59, 59, 999))
                },
                enrollment: { userId }
            }
        });
        return results.map(UniversityMapper.toDomainEvaluation);
    }

    async findEvaluationByStatus(status: string, userId: string): Promise<AcademicEvaluation[]> {
        const results = await this.prisma.academicEvaluation.findMany({
            where: { status, enrollment: { userId } }
        });
        return results.map(UniversityMapper.toDomainEvaluation);
    }

    async findEvaluationByEnrollment(enrollmentId: string, userId: string): Promise<AcademicEvaluation[]> {
        const results = await this.prisma.academicEvaluation.findMany({
            where: {
                enrollmentId,
                enrollment: { userId }
            }
        });
        return results.map(UniversityMapper.toDomainEvaluation);
    }
}