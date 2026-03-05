import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { PrismaModule } from "src/infrastructure/prisma/prisma.module";

import { ResourceController } from "./infrastructure/controllers/resource/resource.controller";
import { PrismaResourceRepository } from "./infrastructure/repositories/prisma-resource.repository";

import { CreateResourceUseCase } from "./application/use-cases/resource/create-resource.use-case";
import { UpdateResourceUseCase } from "./application/use-cases/resource/update-resource.use-case";
import { DeleteResourceUseCase } from "./application/use-cases/resource/delete-resource.use-case";
import { FindResourceByIdUseCase } from "./application/use-cases/resource/find-resource-by-id.use-case";
import { FindResourcesByEnrollmentUseCase } from "./application/use-cases/resource/find-resources-by-enrollment.use-case";
import { FindResourcesWithDetailsUseCase } from "./application/use-cases/resource/find-resources-with-details.use-case";
import { ToggleReadStatusUseCase } from "./application/use-cases/resource/toggle-read-status.use-case";
import { FindResourcesByNameUseCase } from "./application/use-cases/resource/find-resources-by-name.use-case";
import { FindResourcesByTypeUseCase } from "./application/use-cases/resource/find-resources-by-type.use-case";
import { EnrollmentModule } from "./enroll.module";

const ResourceUseCases = [
    CreateResourceUseCase,
    UpdateResourceUseCase,
    DeleteResourceUseCase,
    FindResourceByIdUseCase,
    FindResourcesByEnrollmentUseCase,
    FindResourcesByNameUseCase,
    FindResourcesByTypeUseCase,
    FindResourcesWithDetailsUseCase,
    ToggleReadStatusUseCase,
];

@Module({
    imports: [
        PrismaModule, 
        AuthModule, 
        EnrollmentModule
    ],
    controllers: [ResourceController],
    providers: [
        {
            provide: 'ResourceRepository',
            useClass: PrismaResourceRepository,
        },
        ...ResourceUseCases,
    ],
    exports: ['ResourceRepository', ...ResourceUseCases],
})
export class ResourceModule {}