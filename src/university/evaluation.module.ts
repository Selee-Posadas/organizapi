import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { PrismaModule } from "src/infrastructure/prisma/prisma.module";
import { EnrollmentModule } from "./enroll.module";
import { EvaluationController } from "./infrastructure/controllers/evaluation/evaluation.controller";
import { PrismaEvaluationRepository } from "./infrastructure/repositories/prisma-evaluation.repository";
import { EvaluationRepository } from "./domain/repositories/evaluation.repository";
import { EnrollmentRepository } from "./domain/repositories/enrollment.repository";
import { CreateEvaluationUseCase } from "./application/use-cases/evaluation/create-evaluation.use-case";
import { UpdateEvaluationUseCase } from "./application/use-cases/evaluation/update-evaluation.use-case";

@Module({
    imports: [PrismaModule, AuthModule, EnrollmentModule],
    controllers: [EvaluationController],
    providers: [
        {
            provide: 'EvaluationRepository',
            useClass: PrismaEvaluationRepository,
        },
        {
            provide: CreateEvaluationUseCase,
            useFactory: (evalRepo: EvaluationRepository, enrollRepo: EnrollmentRepository) =>
                new CreateEvaluationUseCase(evalRepo, enrollRepo),
            inject: ['EvaluationRepository', 'EnrollmentRepository'],
        },
        {
            provide: UpdateEvaluationUseCase,
            useFactory: (evalRepo: EvaluationRepository) =>
                new UpdateEvaluationUseCase(evalRepo),
            inject: ['EvaluationRepository'],
        },
    ],
})
export class EvaluationModule { }