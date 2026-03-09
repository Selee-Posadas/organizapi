import { Injectable, Inject } from '@nestjs/common';
import { Category } from '../../domain/entities/category.entity';
import type { CategoryRepository } from '../../domain/repositories/category.repository';

@Injectable()
export class FindAllCategoryUseCase {
  constructor(
    @Inject('CategoryRepository')
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(userId: string): Promise<Category[]> {
    return this.categoryRepository.findAllByUserId(userId);
  }
}
