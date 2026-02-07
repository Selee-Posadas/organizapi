import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryController } from './infrastructure/controllers/category.controller';
import { PrismaCategoryRepository } from './infrastructure/repositories/prisma-category.repository';
import { FindAllCategoryUseCase } from './application/use-cases/find-all-category.use-case';
import { CategoryRepository } from './domain/repositories/category.repository';
import { FindCategoryByIdUseCase } from './application/use-cases/find-by-id-category.use-case';
import { CreateCategoryUseCase } from './application/use-cases/create-category.use-case';
import { UpdateCategoryUseCase } from './application/use-cases/update-category.use-case';
import { DeleteCategoryUseCase } from './application/use-cases/delete-category.use-case';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [CategoryController],
  providers: [
    {
          provide: 'CategoryRepository',
          useClass: PrismaCategoryRepository,
        },
        {
          provide: FindAllCategoryUseCase,
          useFactory: (categoryRepo: CategoryRepository) => {
            return new FindAllCategoryUseCase(categoryRepo);
          },
          inject: ['CategoryRepository'],
        },
        {
          provide: FindCategoryByIdUseCase,
          useFactory: (categoryRepo: CategoryRepository) => {
            return new FindCategoryByIdUseCase(categoryRepo);
          },
          inject: ['CategoryRepository'],
        },
        {
          provide: CreateCategoryUseCase,
          useFactory: (categoryRepo: CategoryRepository) => {
            return new CreateCategoryUseCase(categoryRepo);
          },
          inject: ['CategoryRepository'],
        },
        {
          provide: UpdateCategoryUseCase,
          useFactory: (categoryRepo: CategoryRepository) => {
            return new UpdateCategoryUseCase(categoryRepo);
          },
          inject: ['CategoryRepository'],
        },
        {
          provide: DeleteCategoryUseCase,
          useFactory: (categoryRepo: CategoryRepository) => {
            return new DeleteCategoryUseCase(categoryRepo);
          },
          inject: ['CategoryRepository'],
        },
        PrismaService,
  ]
})
export class CategoryModule {}
