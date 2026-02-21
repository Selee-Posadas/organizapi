import { Category } from '../entities/category.entity';

export interface CategoryRepository {
  createCategory(category: Partial<Category>): Promise<Category>;
  findAllByUserId(userId: string): Promise<Category[]>;
  findById(id: string, userId: string): Promise<Category | null>;
  updateCategory(id: string, userId: string, category: Partial<Category>): Promise<Category>;
  deleteCategory(id: string, userId: string): Promise<void>;
  findCategoryByName(categoryName:string, userId:string):Promise<Category | null>
}