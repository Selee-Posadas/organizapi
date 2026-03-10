import { Category } from 'src/category/domain/entities/category.entity';
import { CategoryType } from 'src/category/domain/enum/category-type.enum';

export class CategoryMapper {
  static toDomain(raw: any): Category {
    return new Category(
      raw.id,
      raw.name,
      raw.icon || null,
      raw.color || null,
      (raw.type as CategoryType) || CategoryType.TASK,
      raw.userId,
      raw.careerId || null,
      raw.createdAt,
    );
  }

  static toPersistence(category: Category) {
    return {
      name: category.name,
      icon: category.icon,
      color: category.color,
      type: category.type,
      careerId: category.careerId,
      userId: category.userId,
    };
  }

  static toPersistencePartial(data: Partial<Category>) {
    const persistenceData: any = {};
    if (data.name) persistenceData.name = data.name;
    if (data.icon !== undefined) persistenceData.icon = data.icon;
    if (data.color !== undefined) persistenceData.color = data.color;
    if (data.type) persistenceData.type = data.type;
    if (data.careerId !== undefined) persistenceData.careerId = data.careerId;
    return persistenceData;
  }
}
