import { Enrollment } from 'src/university/domain/entities/enrollment.entity';
import type { SubjectRepository } from 'src/university/domain/repositories/subject.repository';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EnrollmentStatus } from 'src/university/domain/enums/enrollment-status.enum';
import type { EnrollmentRepository } from 'src/university/domain/repositories/enrollment.repository';
import { CreateEnrollmentDto } from 'src/university/dto/enrollment/create-enrollment.dto';

@Injectable()
export class EnrollInSubjectUseCase {
  constructor(
    @Inject('EnrollmentRepository')
    private readonly enrollRepository: EnrollmentRepository,
    @Inject('SubjectRepository')
    private readonly subjectRepository: SubjectRepository,
  ) {}

  async execute(dto: CreateEnrollmentDto, userId: string): Promise<Enrollment> {
    if (!dto) {
      throw new BadRequestException('Enroll data is required');
    }
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }

    const subject = await this.subjectRepository.findSubjectById(
      dto.subjectId,
      userId,
    );

    if (!subject) {
      throw new NotFoundException(
        'The subject does not exist or you do not have access',
      );
    }
    const existingEnrollment =
      await this.enrollRepository.findEnrollmentBySubject(
        dto.subjectId,
        userId,
      );
    if (existingEnrollment) {
      throw new ConflictException('You are already enrolled to this subject');
    }

    const [requirements, allUserEnrollments] = await Promise.all([
      this.subjectRepository.getCorrelatives(dto.subjectId, userId),
      this.enrollRepository.findAllEnrollments(userId),
    ]);

    const enrollmentMap = new Map(
      allUserEnrollments.map((e) => [e.subjectId, e]),
    );

    if (requirements && requirements.length > 0) {
      for (const req of requirements) {
        const priorEnrollment = enrollmentMap.get(req.requiredSubject.id);

        if (req.type === EnrollmentStatus.APPROVED) {
          if (
            !priorEnrollment ||
            priorEnrollment.status !== EnrollmentStatus.APPROVED
          ) {
            throw new BadRequestException(
              `Prerequisite mismatch: Subject '${req.requiredSubject.name}' must be APPROVED before enroll in this subject..`,
            );
          }
        }

        if (req.type === EnrollmentStatus.REGULAR) {
          const isRegular =
            priorEnrollment &&
            [
              EnrollmentStatus.REGULAR,
              EnrollmentStatus.APPROVED,
              EnrollmentStatus.PROMOTED,
            ].includes(priorEnrollment.status);

          if (!isRegular) {
            throw new BadRequestException(
              `Academic requirement not met: You need at least REGULAR status in '${req.requiredSubject.name}' to proceed.`,
            );
          }
        }
      }
    }

    return await this.enrollRepository.enrollUserInSubject({
      userId,
      subjectId: dto.subjectId,
      academicYear: dto.academicYear,
      status: EnrollmentStatus.STUDYING,
    });
  }
}
