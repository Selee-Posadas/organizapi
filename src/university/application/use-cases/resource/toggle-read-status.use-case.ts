import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Resource } from 'src/university/domain/entities/resource.entity';
import type { ResourceRepository } from 'src/university/domain/repositories/resource.repository';

@Injectable()
export class ToggleReadStatusUseCase {
  constructor(
    @Inject('ResourceRepository')
    private readonly repo: ResourceRepository,
  ) {}

  async execute(
    id: string,
    userId: string,
    isRead: boolean,
  ): Promise<Resource> {
    if (!isRead) {
      throw new BadRequestException('Resource read is required');
    }
    if (!id) {
      throw new BadRequestException('Resource ID is required');
    }
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }
    const resource = await this.repo.findResourceById(id, userId);
    if (!resource) throw new NotFoundException('Resource not found');

    return await this.repo.toggleReadStatus(id, userId, isRead);
  }
}
