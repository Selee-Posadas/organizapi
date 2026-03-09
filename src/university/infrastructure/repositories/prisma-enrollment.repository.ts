import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { Enrollment } from 'src/university/domain/entities/enrollment.entity';
import { EnrollmentRepository } from 'src/university/domain/repositories/enrollment.repository';
import { UniversityMapper } from '../mappers/university.mapper';
import { EnrollmentStatus } from 'src/university/domain/enums/enrollment-status.enum';
import { EnrollmentWithDetailsDto } from 'src/university/dto/enrollment/enrollment-with-details.dto';

@Injectable()
export class PrismaEnrollmentRepository implements EnrollmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async enrollUserInSubject(enrollment: Enrollment): Promise<Enrollment> {
    const created = await this.prisma.enrollment.create({
      data: {
        userId: enrollment.userId,
        subjectId: enrollment.subjectId,
        status: enrollment.status,
        academicYear: enrollment.academicYear,
        finalGrade: enrollment.finalGrade,
      },
    });
    return UniversityMapper.toDomainEnrollment(created);
  }

  async updateEnrollment(
    id: string,
    userId: string,
    data: Partial<Enrollment>,
  ): Promise<Enrollment> {
    const updated = await this.prisma.enrollment.update({
      where: { id_userId: { id, userId } },
      data: {
        status: data.status,
        finalGrade: data.finalGrade,
        academicYear: data.academicYear,
      },
    });
    return UniversityMapper.toDomainEnrollment(updated);
  }

  async deleteEnrollment(id: string, userId: string): Promise<void> {
    await this.prisma.enrollment.delete({
      where: { id_userId: { id, userId } },
    });
  }

  async findEnrollmentById(
    id: string,
    userId: string,
  ): Promise<Enrollment | null> {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id_userId: { id, userId } },
    });
    return enrollment ? UniversityMapper.toDomainEnrollment(enrollment) : null;
  }

  async findAllEnrollments(userId: string): Promise<Enrollment[]> {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { userId },
    });
    return enrollments.map(UniversityMapper.toDomainEnrollment);
  }

  async findEnrollmentBySubject(
    subjectId: string,
    userId: string,
  ): Promise<Enrollment | null> {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { userId_subjectId: { userId, subjectId } },
    });
    return enrollment ? UniversityMapper.toDomainEnrollment(enrollment) : null;
  }

  async findEnrollmentByStatus(
    status: EnrollmentStatus,
    userId: string,
  ): Promise<Enrollment[]> {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { userId, status },
    });
    return enrollments.map(UniversityMapper.toDomainEnrollment);
  }

  async findEnrollmentByYear(
    academicYear: number,
    userId: string,
  ): Promise<Enrollment[]> {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { userId, academicYear },
    });
    return enrollments.map(UniversityMapper.toDomainEnrollment);
  }

  async findAllEnrollmentsWithDetails(
    userId: string,
  ): Promise<EnrollmentWithDetailsDto[]> {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { userId },
      include: {
        subject: {
          include: {
            career: true,
          },
        },
      },
    });

    return enrollments.map((enroll) =>
      UniversityMapper.toResponseEnrollmentDto(enroll),
    );
  }
}
