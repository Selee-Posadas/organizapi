import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { Enrollment } from "src/university/domain/entities/enrollment.entity";
import { EnrollmentRepository } from "src/university/domain/repositories/enrollment.repository";
import { UniversityMapper } from "../mappers/university.mapper";

@Injectable()
export class PrismaEnrollmentRepository implements EnrollmentRepository {
    constructor(private readonly prisma: PrismaService) { }

    async enrollUserInSubject(enrollment: Enrollment): Promise<Enrollment> {
        const created = await this.prisma.enrollment.create({
            data: {
                userId: enrollment.userId,
                subjectId: enrollment.subjectId,
                status: enrollment.status,
                academicYear: enrollment.academicYear,
            }
        });
        return UniversityMapper.toDomainEnrollment(created);
    }

    async updateEnrollment(id: string, userId: string, data: Partial<Enrollment>): Promise<Enrollment> {
        const updated = await this.prisma.enrollment.update({
            where: { id, userId },
            data: {
                status: data.status,
                finalGrade: data.finalGrade,
            }
        });
        return UniversityMapper.toDomainEnrollment(updated);
    }

    async findUserEnrollments(userId: string): Promise<Enrollment[]> {
        const enrollments = await this.prisma.enrollment.findMany({
            where: { userId }
        });
        return enrollments.map(UniversityMapper.toDomainEnrollment);
    }

    async findEnrollmentByUserAndSubject(userId: string, subjectId: string): Promise<Enrollment | null> {
        const enrollment = await this.prisma.enrollment.findFirst({
            where: {userId, subjectId}
        });
        return enrollment ? UniversityMapper.toDomainEnrollment(enrollment): null;
    }
}