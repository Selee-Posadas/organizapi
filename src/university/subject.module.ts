import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { PrismaModule } from "src/infrastructure/prisma/prisma.module";
import { AddSubjectUseCase } from "./application/use-cases/add-subject.use-case";
import { CareerModule } from "./career.module";
import { CareerRepository } from "./domain/repositories/career.repository";
import { SubjectRepository } from "./domain/repositories/subject.repository";
import { SubjectController } from "./infrastructure/controllers/subject/subject.controller";
import { PrismaSubjectRepository } from "./infrastructure/repositories/prisma-subject.repository";

@Module({
  imports: [PrismaModule, AuthModule, CareerModule],
  controllers: [SubjectController],
  providers: [
    {
      provide: 'SubjectRepository',
      useClass: PrismaSubjectRepository,
    },
    {
      provide: AddSubjectUseCase,
      useFactory: (subRepo: SubjectRepository, careerRepo: CareerRepository) => 
        new AddSubjectUseCase(subRepo, careerRepo),
      inject: ['SubjectRepository', 'CareerRepository'],
    },
  ],
  exports: ['SubjectRepository'],
})
export class SubjectModule {}