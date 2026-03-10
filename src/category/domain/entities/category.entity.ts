import { CategoryType } from '../enum/category-type.enum';

export class Category {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly icon: string | null,
    public readonly color: string | null,
    public readonly type: CategoryType,
    public readonly userId: string,
    public readonly careerId: string | null,
    public readonly createdAt: Date,
  ) {
    if (!name || name.length < 1) throw new Error('Name is required');
  }
}
