import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { ResourceRepository } from 'src/university/domain/repositories/resource.repository';

@Injectable()
export class DeleteResourceUseCase {
  constructor(
    @Inject('ResourceRepository')
    private readonly repo: ResourceRepository,
  ) {}

  async execute(id: string, userId: string): Promise<void> {
    if (!id) {
      throw new BadRequestException('Resource ID is required');
    }
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }
    const resource = await this.repo.findResourceById(id, userId);
    if (!resource) throw new NotFoundException('Resource not found');

    await this.repo.deleteResource(id, userId);
  }
}
