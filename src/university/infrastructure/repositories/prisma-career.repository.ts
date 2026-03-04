import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { Career } from "src/university/domain/entities/career.entity";
import { CareerRepository } from "src/university/domain/repositories/career.repository";
import { UniversityMapper } from "../mappers/university.mapper";
import { StudyType } from "src/university/domain/enums/study-type.enum";

@Injectable()
export class PrismaCareerRepository implements CareerRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createCareer(career: Partial<Career> & { userId: string }): Promise<Career> {
        const created = await this.prisma.career.create({
            data: {
                name: career.name!,
                userId: career.userId,
                institution: career.institution,
                type: career.type,
                whatsappGroup: career.whatsappGroup,
                facultyContactInfo: career.facultyContactInfo
            },
        });
        return UniversityMapper.toDomainCareer(created);
    }

    async updateCareer(id: string, userId: string, data: Partial<Career>): Promise<Career> {
        const updated = await this.prisma.career.update({
            where: { id, userId },
            data: { ...data },
        });
        return UniversityMapper.toDomainCareer(updated);
    }

    async deleteCareer(id: string, userId: string): Promise<void> {
        await this.prisma.career.delete({
            where: { id, userId }
        });
    }

    async findCareerById(id: string, userId: string): Promise<Career | null> {
        const career = await this.prisma.career.findFirst({
            where: { id, userId },
        });
        return career ? UniversityMapper.toDomainCareer(career) : null;
    }

    async findCareersByName(name: string, userId: string): Promise<Career[]> {
        const career = await this.prisma.career.findMany({
            where: {
                name: { equals: name, mode: 'insensitive' },
                userId: userId,
            },
        });

        return career.map(UniversityMapper.toDomainCareer);
    }

    async findAllCareers(userId: string): Promise<Career[]> {
        const careers = await this.prisma.career.findMany({
            where: { userId }
        });

        return careers.map(UniversityMapper.toDomainCareer);
    }

    async findCareersByType(studyType: StudyType, userId: string): Promise<Career[]> {
        const careers = await this.prisma.career.findMany({
            where: { type: studyType, userId }
        });

        return careers.map(UniversityMapper.toDomainCareer);
    }

    async findCareersByIntitution(institution: string, userId: string): Promise<Career[]> {
        const carers = await this.prisma.career.findMany({
            where: {
                userId: userId,
                institution: { equals: institution, mode: 'insensitive' }
            }
        });
        return carers.map(UniversityMapper.toDomainCareer);
    }

}