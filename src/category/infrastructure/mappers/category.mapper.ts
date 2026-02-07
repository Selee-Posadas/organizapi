import { Category } from "src/category/domain/entities/category.entity";

export class CategoryMapper {
    static toDomain(raw: any): Category {
        return new Category(
            raw.id,
            raw.name,
            raw.color,
            raw.userId,
            raw.createdAt
        );
    }
    static toPersistence(category: Category) {
        return {
            name: category.name,
            color: category.color,
            userId: category.userId,
        };
    }


    static toPersistencePartial(data: Partial<Category>) {
        const persistenceData: any = {};
        if (data.name) persistenceData.name = data.name;
        if (data.color) persistenceData.color = data.color;
        return persistenceData;
    }
}