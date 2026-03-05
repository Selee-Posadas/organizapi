import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { PrismaModule } from "src/infrastructure/prisma/prisma.module";
import { EnrollmentModule } from "./enroll.module";


import { EvaluationController } from "./infrastructure/controllers/evaluation/evaluation.controller";
import { PrismaEvaluationRepository } from "./infrastructure/repositories/prisma-evaluation.repository";


import { CreateEvaluationUseCase } from "./application/use-cases/evaluation/create-evaluation.use-case";
import { UpdateEvaluationUseCase } from "./application/use-cases/evaluation/update-evaluation.use-case";
import { DeleteEvaluationUseCase } from "./application/use-cases/evaluation/delete-evaluation.use-case";
import { FindEvaluationByIdUseCase } from "./application/use-cases/evaluation/find-evaluation-by-id.use-case";
import { FindAllEvaluationUseCase } from "./application/use-cases/evaluation/find-all-evaluation.use-case";
import { FindAllEvaluationWithDetailsUseCase } from "./application/use-cases/evaluation/find-all-evaluation-details.use-case";
import { FindEvaluationByTypeUseCase } from "./application/use-cases/evaluation/find-evaluation-by-type.use-case";
import { FindEvaluationByDayUseCase } from "./application/use-cases/evaluation/find-evaluation-by-day.use-case";
import { FindEvaluationByStatusUseCase } from "./application/use-cases/evaluation/find-evaluation-by-status.use-case";
import { FindEvaluationByEnrollmentUseCase } from "./application/use-cases/evaluation/find-evaluation-by-enroll.use-case";


const EvaluationUseCases = [
  CreateEvaluationUseCase,
  UpdateEvaluationUseCase,
  DeleteEvaluationUseCase,
  FindEvaluationByIdUseCase,
  FindAllEvaluationUseCase,
  FindAllEvaluationWithDetailsUseCase,
  FindEvaluationByTypeUseCase,
  FindEvaluationByDayUseCase,
  FindEvaluationByStatusUseCase,
  FindEvaluationByEnrollmentUseCase,
];

@Module({
  imports: [
    PrismaModule, 
    AuthModule, 
    EnrollmentModule
  ],
  controllers: [EvaluationController],
  providers: [
    {
      provide: 'EvaluationRepository',
      useClass: PrismaEvaluationRepository,
    },
    ...EvaluationUseCases,
  ],
  exports: ['EvaluationRepository', ...EvaluationUseCases],
})
export class EvaluationModule { }