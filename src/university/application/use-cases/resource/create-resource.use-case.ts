import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Resource } from 'src/university/domain/entities/resource.entity';
import type { EnrollmentRepository } from 'src/university/domain/repositories/enrollment.repository';
import type { ResourceRepository } from 'src/university/domain/repositories/resource.repository';
import { CreateResourceDto } from 'src/university/dto/resource/create-resource.dto';

@Injectable()
export class CreateResourceUseCase {
  constructor(
    @Inject('ResourceRepository')
    private readonly repo: ResourceRepository,
    @Inject('EnrollmentRepository')
    private readonly enrollmentRepo: EnrollmentRepository,
  ) {}

  async execute(dto: CreateResourceDto, userId: string): Promise<Resource> {
    if (!dto) {
      throw new BadRequestException('Resource is required');
    }
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }
    const enrollment = await this.enrollmentRepo.findEnrollmentById(
      dto.enrollmentId,
      userId,
    );
    if (!enrollment)
      throw new NotFoundException('Enrollment not found or unauthorized');

    return await this.repo.createResource(dto);
  }
}
