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
    FindAllCategoryUseCase,
    FindCategoryByIdUseCase,
    CreateCategoryUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
    PrismaService,
  ],
})
export class CategoryModule {}
