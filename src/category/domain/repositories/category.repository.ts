import { Category } from '../entities/category.entity';

export interface CategoryRepository {
  createCategory(category: Partial<Category>): Promise<Category>;
  findAllByUserId(userId: string): Promise<Category[]>;
  findById(id: string): Promise<Category | null>;
  updateCategory(id: string, category: Partial<Category>): Promise<Category>;
  deleteCategory(id: string): Promise<void>;
  findCategoryByName(categoryName:string, userId:string):Promise<Category>
}