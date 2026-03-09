import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { CareerRepository } from './domain/repositories/career.repository';
import { AuthModule } from 'src/auth/auth.module';
import { CareerController } from './infrastructure/controllers/career/career.controller';
import { Module } from '@nestjs/common';
import { PrismaCareerRepository } from './infrastructure/repositories/prisma-career.repository';
import { CreateCareerUseCase } from './application/use-cases/career/create-career.use-case';
import { DeleteCareerUseCase } from './application/use-cases/career/delete-career.use-case';
import { FindAllCareersUseCase } from './application/use-cases/career/find-all-careers.use-case';
import { FindCareerByIdUseCase } from './application/use-cases/career/find-career-by-id.use-case';
import { FindCareersByInstitutionUseCase } from './application/use-cases/career/find-careers-by-institution.use-case';
import { FindCareersByNameUseCase } from './application/use-cases/career/find-careers-by-name.use-case';
import { FindCareersByTypeUseCase } from './application/use-cases/career/find-careers-by-type.use-case';
import { UpdateCareerUseCase } from './application/use-cases/career/update-career.use-case';

const CareerUseCases = [
  CreateCareerUseCase,
  UpdateCareerUseCase,
  DeleteCareerUseCase,
  FindCareerByIdUseCase,
  FindAllCareersUseCase,
  FindCareersByNameUseCase,
  FindCareersByTypeUseCase,
  FindCareersByInstitutionUseCase,
];

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [CareerController],
  providers: [
    {
      provide: 'CareerRepository',
      useClass: PrismaCareerRepository,
    },
    ...CareerUseCases,
  ],
  exports: ['CareerRepository'],
})
export class CareerModule {}
