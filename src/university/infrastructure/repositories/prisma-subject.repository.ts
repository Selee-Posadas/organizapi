import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { Subject } from "src/university/domain/entities/subject.entity";
import { SubjectRepository } from "src/university/domain/repositories/subject.repository";
import { UniversityMapper } from "../mappers/university.mapper";

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
            },
        });
        return UniversityMapper.toDomainSubject(created);
    }

    async findSubjectById(id: string, userId: string): Promise<Subject | null> {
        const subject = await this.prisma.subject.findFirst({
            where: { id },
        });
        return subject ? UniversityMapper.toDomainSubject(subject) : null;
    }

    async findSubjectByName(name: string, userId: string): Promise<Subject | null> {
        const subject = await this.prisma.subject.findFirst({
            where: {
                name: { equals: name, mode: 'insensitive' },
            },
        });

        if (!subject) return null;
        return UniversityMapper.toDomainSubject(subject);
    }

    async findSubjectsByCareer(careerId: string, userId: string): Promise<Subject[]> {
        const subjects = await this.prisma.subject.findMany({
            where: {
                careerId: careerId,
                career: { userId: userId }
            }
        });
        return subjects.map(UniversityMapper.toDomainSubject);
    }

    async updateSubject(id: string, userId: string, data: Partial<Subject>): Promise<Subject> {
        const updated = await this.prisma.subject.update({
            where: {
                id,
                career: { userId: userId }
            },
            data: { ...data }
        });
        return UniversityMapper.toDomainSubject(updated);
    }
}