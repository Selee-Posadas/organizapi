import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { ResourceRepository } from 'src/university/domain/repositories/resource.repository';
import { Resource } from 'src/university/domain/entities/resource.entity';

@Injectable()
export class FindResourceByIdUseCase {
  constructor(
    @Inject('ResourceRepository')
    private readonly resourceRepo: ResourceRepository,
  ) {}

  async execute(id: string, userId: string): Promise<Resource | null> {
    if (!id) {
      throw new BadRequestException('Resource ID is required');
    }
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }

    return await this.resourceRepo.findResourceById(id, userId);
  }
}
