import { Category } from "../../domain/entities/category.entity";
import { CategoryRepository } from "../../domain/repositories/category.repository";
import { UpdateCategoryDto } from "../../dto/update-category.dto";

export class UpdateCategoryUseCase {
    constructor(
        private readonly categoryRepository: CategoryRepository,
    ){}

    async execute(categoryId: string, userId: string, dto: UpdateCategoryDto): Promise<Category>{
        const existingCategory = await this.categoryRepository.findById(categoryId, userId);

        if(!existingCategory){
            throw new Error('Category not found');
        }

        if(existingCategory.userId !== userId){
            throw new Error('You do not have permission to update this category');
        }

        const updatedCategory = await this.categoryRepository.updateCategory(categoryId, userId, {
            name: dto.name,
            color: dto.color,
        });
        return updatedCategory;
    }
}