import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { PrismaModule } from "src/infrastructure/prisma/prisma.module";
import { SubjectModule } from "./subject.module";

import { EnrollmentController } from "./infrastructure/controllers/enrollment/enrollment.controller";
import { PrismaEnrollmentRepository } from "./infrastructure/repositories/prisma-enrollment.repository";

import { EnrollInSubjectUseCase } from "./application/use-cases/enrollment/enroll-in-subject.use-case";
import { UpdateEnrollmentUseCase } from "./application/use-cases/enrollment/update-enrollment.use-case";
import { DeleteEnrollmentUseCase } from "./application/use-cases/enrollment/delete-enrollment.use-case";
import { FindAllEnrollmentsUseCase } from "./application/use-cases/enrollment/find-all-enrollments.use-case";
import { FindAllEnrollmentsWithDetailsUseCase } from "./application/use-cases/enrollment/find-enrollment-with-details.use-case";
import { FindEnrollmentByIdUseCase } from "./application/use-cases/enrollment/find-enrollment-by-id.use-case";
import { FindEnrollmentByStatusUseCase } from "./application/use-cases/enrollment/find-enrollment-by-status.use-case";
import { FindEnrollmentByYearUseCase } from "./application/use-cases/enrollment/find-enrollment-by-year.use-case";
import { FindEnrollmentBySubjectUseCase } from "./application/use-cases/enrollment/find-enrollment-by-subject.use-case";


const EnrollmentUseCases = [
  EnrollInSubjectUseCase,
  UpdateEnrollmentUseCase,
  DeleteEnrollmentUseCase,
  FindAllEnrollmentsUseCase,
  FindAllEnrollmentsWithDetailsUseCase,
  FindEnrollmentByIdUseCase,
  FindEnrollmentByStatusUseCase,
  FindEnrollmentByYearUseCase,
  FindEnrollmentBySubjectUseCase,
];

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    SubjectModule
  ],
  controllers: [EnrollmentController],
  providers: [
    {
      provide: 'EnrollmentRepository',
      useClass: PrismaEnrollmentRepository,
    },
    ...EnrollmentUseCases,
  ],
  exports: ['EnrollmentRepository', ...EnrollmentUseCases],
})
export class EnrollmentModule { }