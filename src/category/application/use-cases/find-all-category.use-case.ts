import { Category } from "../../domain/entities/category.entity";
import { CategoryRepository } from "../../domain/repositories/category.repository";

export class FindAllCategoryUseCase {
    constructor(
        private readonly categoryRepository: CategoryRepository
    ){}

    async execute(userId: string): Promise <Category[]>{
        return this.categoryRepository.findAllByUserId(userId);
    }
}