import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { Subject } from "src/university/domain/entities/subject.entity";
import { CorrelativeResult, SubjectRepository } from "src/university/domain/repositories/subject.repository";
import { UniversityMapper } from "../mappers/university.mapper";
import { EnrollmentStatus } from "src/university/domain/enums/enrollment-status.enum";

@Injectable()
export class PrismaSubjectRepository implements SubjectRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createSubject(subject: Partial<Subject>): Promise<Subject> {
        const created = await this.prisma.subject.create({
            data: {
                careerId: subject.careerId!,
                name: subject.name!,
                yearLevel: subject.yearLevel!,
                semester: subject.semester!,
                credits: subject.credits ?? 0,
            }, include: {
                correlatives: { include: { requiredSubject: true } }
            }
        });
        return UniversityMapper.toDomainSubject(created);
    }

    async updateSubject(id: string, userId: string, data: Partial<Subject>): Promise<Subject> {
        await this.prisma.subject.updateMany({
            where: { id, career: { userId } },
            data: { ...data }
        });

        const result = await this.findSubjectById(id, userId);
        if (!result) throw new Error('Subject not found or unauthorized');
        return result;
    }

    async deleteSubject(id: string, userId: string): Promise<void> {
        const result = await this.prisma.subject.deleteMany({
            where: { id, career: { userId } }
        });
        if (result.count === 0) throw new Error('Subject not found or unauthorized');
    }

    async findSubjectById(id: string, userId: string): Promise<Subject | null> {
        const subject = await this.prisma.subject.findFirst({
            where: { id, career: { userId } },
            include: {
                correlatives: { include: { requiredSubject: true } }
            }
        });
        return subject ? UniversityMapper.toDomainSubject(subject) : null;
    }

    async findSubjectByName(name: string, userId: string): Promise<Subject | null> {
        const subject = await this.prisma.subject.findFirst({
            where: {
                name: { equals: name, mode: 'insensitive' },
                career: { userId }
            },
            include: {
                correlatives: { include: { requiredSubject: true } }
            }
        });

        return subject ? UniversityMapper.toDomainSubject(subject) : null;
    }

    async findSubjectsByCareer(careerId: string, userId: string): Promise<Subject[]> {
        const subjects = await this.prisma.subject.findMany({
            where: { careerId, career: { userId } },
            include: {
                correlatives: { include: { requiredSubject: true } }
            },
            orderBy: [{ yearLevel: 'asc' }, { semester: 'asc' }]
        });
        return subjects.map(UniversityMapper.toDomainSubject);
    }



    async getCorrelatives(subjectId: string, userId: string): Promise<CorrelativeResult[]> {
        const result = await this.prisma.subjectCorrelative.findMany({
            where: {
                subjectId: subjectId,
                subject: {
                    career: {
                        userId: userId
                    }
                }
            },
            include: {
                requiredSubject: true
            }
        });

        return result.map(res => ({
            requiredSubject: UniversityMapper.toDomainSubject(res.requiredSubject),
            type: res.type as EnrollmentStatus.REGULAR || EnrollmentStatus.APPROVED
        }));
    }

    async addCorrelative(subjectId: string, requiredId: string, type: EnrollmentStatus, userId: string): Promise<void> {

        const subject = await this.findSubjectById(subjectId, userId);
        const required = await this.findSubjectById(requiredId, userId);

        if (!subject || !required) throw new Error('Unauthorized or subject not found');

        await this.prisma.subjectCorrelative.create({
            data: {
                subjectId,
                requiredSubjectId: requiredId,
                type
            }
        });
    }

    async removeCorrelative(subjectId: string, requiredId: string, userId: string): Promise<void> {
        await this.prisma.subjectCorrelative.deleteMany({
            where: {
                subjectId,
                requiredSubjectId: requiredId,
                subject: { career: { userId } }
            }
        });
    }
}