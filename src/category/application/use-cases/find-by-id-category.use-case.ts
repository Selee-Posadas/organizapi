import { Category } from "src/category/domain/entities/category.entity";
import { CategoryRepository } from "src/category/domain/repositories/category.repository";

export class FindCategoryByIdUseCase{
    constructor(
        private readonly categoryRepository: CategoryRepository,
    ){}

    async execute(categoryId:string, userId:string):Promise<Category>{
        const category = await this.categoryRepository.findById(categoryId);
        if(!category){
            throw new Error('Category not found');
        }
        if(category.userId !== userId){
            throw new Error('You do not have permission to access this category');
        }
        return category;
    }
}