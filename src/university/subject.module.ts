import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { PrismaModule } from "src/infrastructure/prisma/prisma.module";

import { SubjectController } from "./infrastructure/controllers/subject/subject.controller";
import { PrismaSubjectRepository } from "./infrastructure/repositories/prisma-subject.repository";

import { AddSubjectUseCase } from "./application/use-cases/subject/add-subject.use-case";
import { UpdateSubjectUseCase } from "./application/use-cases/subject/update-subject.use-case";
import { DeleteSubjectUseCase } from "./application/use-cases/subject/delete-subject.use-case";
import { FindSubjectByIdUseCase } from "./application/use-cases/subject/find-subject-by-id.use-case";
import { FindSubjectByNameUseCase } from "./application/use-cases/subject/find-subject-by-name.use-case";
import { FindSubjectsByCareerUseCase } from "./application/use-cases/subject/find-subjects-by-career.use-case";
import { GetCorrelativesUseCase } from "./application/use-cases/subject/get-correlatives.use-case";
import { AddCorrelativeUseCase } from "./application/use-cases/subject/add-correlative.use-case";
import { RemoveCorrelativeUseCase } from "./application/use-cases/subject/remove-correlative.use-case";
import { CareerModule } from "./career.module";

const SubjectUseCases = [
    AddSubjectUseCase,
    UpdateSubjectUseCase,
    DeleteSubjectUseCase,
    FindSubjectByIdUseCase,
    FindSubjectByNameUseCase,
    FindSubjectsByCareerUseCase,
    GetCorrelativesUseCase,
    AddCorrelativeUseCase,
    RemoveCorrelativeUseCase,
];

@Module({
    imports: [
        PrismaModule, 
        AuthModule, 
        CareerModule
    ],
    controllers: [SubjectController],
    providers: [
        {
            provide: 'SubjectRepository',
            useClass: PrismaSubjectRepository,
        },
        ...SubjectUseCases,
    ],
    exports: ['SubjectRepository', ...SubjectUseCases],
})
export class SubjectModule { }