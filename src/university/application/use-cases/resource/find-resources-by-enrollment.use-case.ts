import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Resource } from 'src/university/domain/entities/resource.entity';
import type { ResourceRepository } from 'src/university/domain/repositories/resource.repository';

@Injectable()
export class FindResourcesByEnrollmentUseCase {
  constructor(
    @Inject('ResourceRepository')
    private readonly repo: ResourceRepository,
  ) {}

  async execute(enrollmentId: string, userId: string): Promise<Resource[]> {
    if (!enrollmentId) {
      throw new BadRequestException('Enrollment ID is required');
    }
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }
    return await this.repo.findResourcesByEnrollment(enrollmentId, userId);
  }
}
