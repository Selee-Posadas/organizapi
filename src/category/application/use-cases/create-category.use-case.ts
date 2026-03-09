import { Injectable, Inject } from '@nestjs/common';
import { Category } from '../../domain/entities/category.entity';
import type { CategoryRepository } from '../../domain/repositories/category.repository';
import { CreateCategoryDto } from '../../dto/create-category.dto';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject('CategoryRepository')
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(dto: CreateCategoryDto, userId: string): Promise<Category> {
    const existingCategory = await this.categoryRepository.findCategoryByName(
      dto.name,
      userId,
    );

    if (existingCategory) throw new Error('Category is already exist');

    return await this.categoryRepository.createCategory({
      name: dto.name,
      color: dto.color,
      userId: userId,
    });
  }
}
