import { Category } from '../../domain/entities/category.entity';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { CreateCategoryDto } from '../../dto/create-category.dto';
export class CreateCategoryUseCase{
    constructor(
        private readonly categoryRepository: CategoryRepository,
    ){}

    async execute(dto: CreateCategoryDto, userId: string): Promise<Category>{
        const newCategory = await this.categoryRepository.createCategory({
            name: dto.name,
            color: dto.color,
            userId: userId,
        });
        return newCategory;
    }
}