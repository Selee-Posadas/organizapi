import { CategoryRepository } from "../../domain/repositories/category.repository";

export class DeleteCategoryUseCase {
    constructor(
        private readonly categoryRepository: CategoryRepository,
    ){}

    async execute(categoryId: string, userId: string): Promise<void>{
        const category = await this.categoryRepository.findById(categoryId, userId);
        if(!category){
            throw new Error('Category not found');
        }
        if(category.userId !== userId){
            throw new Error('You do not have permission to delete this category');
        }
        await this.categoryRepository.deleteCategory(categoryId, userId);
    }
}