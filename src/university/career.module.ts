import { PrismaModule } from "src/infrastructure/prisma/prisma.module";
import { CreateCareerUseCase } from "./application/use-cases/create-career.use-case";
import { CareerRepository } from "./domain/repositories/career.repository";
import { AuthModule } from "src/auth/auth.module";
import { CareerController } from "./infrastructure/controllers/career/career.controller";
import { Module } from "@nestjs/common";
import { PrismaCareerRepository } from "./infrastructure/repositories/prisma-career.repository";

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [CareerController],
  providers: [
    {
      provide: 'CareerRepository',
      useClass: PrismaCareerRepository,
    },
    {
      provide: CreateCareerUseCase,
      useFactory: (repo: CareerRepository) => new CreateCareerUseCase(repo),
      inject: ['CareerRepository'],
    },
  ],
  exports: ['CareerRepository'],
})
export class CareerModule {}