import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { Career } from "src/university/domain/entities/career.entity";
import { CareerRepository } from "src/university/domain/repositories/career.repository";
import { UniversityMapper } from "../mappers/university.mapper";

@Injectable()
export class PrismaCareerRepository implements CareerRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createCareer(career: Partial<Career> & { userId: string }): Promise<Career> {
        const created = await this.prisma.career.create({
            data: {
                name: career.name!,
                userId: career.userId,
            },
        });
        return UniversityMapper.toDomainCareer(created);
    }

    async findCareerById(id: string, userId: string): Promise<Career | null> {
        const career = await this.prisma.career.findFirst({
            where: { id, userId },
        });
        return career ? UniversityMapper.toDomainCareer(career) : null;
    }

    async findCareerByName(name: string, userId: string): Promise<Career | null> {
        const career = await this.prisma.career.findFirst({
            where: {
                name: { equals: name, mode: 'insensitive' },
                userId: userId,
            },
        });

        if (!career) return null;
        return UniversityMapper.toDomainCareer(career);
    }

    async updateCareer(id: string, userId: string, data: Partial<Career>): Promise<Career> {
        const updated = await this.prisma.career.update({
            where: { id, userId },
            data: { name: data.name },
        });
        return UniversityMapper.toDomainCareer(updated);
    }
}