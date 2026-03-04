import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { PrismaModule } from "src/infrastructure/prisma/prisma.module";
import { EnrollmentRepository } from "./domain/repositories/enrollment.repository";
import { SubjectRepository } from "./domain/repositories/subject.repository";
import { EnrollmentController } from "./infrastructure/controllers/enrollment/enrollment.controller";
import { PrismaEnrollmentRepository } from "./infrastructure/repositories/prisma-enrollment.repository";
import { SubjectModule } from "./subject.module";
import { EnrollInSubjectUseCase } from "./application/use-cases/enrollment/enroll-in-subject.use-case";

@Module({
  imports: [PrismaModule, AuthModule, SubjectModule],
  controllers: [EnrollmentController],
  providers: [
    {
      provide: 'EnrollmentRepository',
      useClass: PrismaEnrollmentRepository,
    },
    {
      provide: EnrollInSubjectUseCase,
      useFactory: (enrollRepo: EnrollmentRepository, subRepo: SubjectRepository) => 
        new EnrollInSubjectUseCase(enrollRepo, subRepo),
      inject: ['EnrollmentRepository', 'SubjectRepository'],
    },
  ],
})
export class EnrollmentModule {}