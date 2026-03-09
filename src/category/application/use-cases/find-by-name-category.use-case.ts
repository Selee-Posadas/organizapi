import { Injectable, Inject } from '@nestjs/common';
import { Category } from 'src/category/domain/entities/category.entity';
import type { CategoryRepository } from 'src/category/domain/repositories/category.repository';

@Injectable()
export class FindCategoryByNameUseCase {
  constructor(
    @Inject('CategoryRepository')
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(categoryName: string, userId: string): Promise<Category> {
    const category = await this.categoryRepository.findCategoryByName(
      categoryName,
      userId,
    );
    if (!category) {
      throw new Error('Category not found');
    }
    if (category.userId !== userId) {
      throw new Error('You do not have permission to access to this recurse');
    }
    return category;
  }
}
