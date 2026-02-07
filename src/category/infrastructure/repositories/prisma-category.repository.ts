import { Injectable } from "@nestjs/common";
import { Category } from "src/category/domain/entities/category.entity";
import { CategoryRepository } from "src/category/domain/repositories/category.repository";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { CategoryMapper } from "../mappers/category.mapper";

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async createCategory(category: Category): Promise<Category>{
        const data = CategoryMapper.toPersistence(category);

        const createdCategory = await this.prisma.category.create({
            data,
        });

        return CategoryMapper.toDomain(createdCategory);
    }

    async findById(id: string): Promise<Category | null> {
        const category = await this.prisma.category.findUnique({
            where: { id },
        });
        if(!category) return null;

        return CategoryMapper.toDomain(category);
    }
    
    async findAllByUserId(userId: string): Promise<Category[]> {
        const categories = await this.prisma.category.findMany({
            where: { userId },
        });
        if(!categories) return [];
        return categories.map(CategoryMapper.toDomain);
    }

    async updateCategory(id: string, category: Partial<Category>): Promise<Category> {
        const persistenceData = CategoryMapper.toPersistencePartial(category);

        const updateCategory = await this.prisma.category.update({
            where: { id },
            data: persistenceData,
        });

        return CategoryMapper.toDomain(updateCategory);
    }

    async deleteCategory(id: string): Promise<void> {
        await this.prisma.category.delete({
            where: { id },
        });
    }
}