import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { EnrollmentModule } from './enroll.module';

import { ScheduleController } from './infrastructure/controllers/schedule/schedule.controller';
import { PrismaScheduleRepository } from './infrastructure/repositories/prisma-schedule.repository';

import { CreateScheduleUseCase } from 'src/university/application/use-cases/schedule/create-schedule.use-case';
import { DeleteScheduleUseCase } from 'src/university/application/use-cases/schedule/delete-schedule.use-case';
import { FindAllSchedulesWithDetailsUseCase } from 'src/university/application/use-cases/schedule/find-all-schedule-with-detail.use-case';
import { FindAllSchedulesUseCase } from 'src/university/application/use-cases/schedule/find-all-schedule.use-case';
import { FindScheduleByDayUseCase } from 'src/university/application/use-cases/schedule/find-schedule-by-day.use-case';
import { FindScheduleByEnrollUseCase } from 'src/university/application/use-cases/schedule/find-schedule-by-enroll.use-case';
import { FindScheduleByIdUseCase } from 'src/university/application/use-cases/schedule/find-schedule-by-id.use-case';
import { FindScheduleByLocationUseCase } from 'src/university/application/use-cases/schedule/find-schedule-by-location.use-case';
import { FindSchedulesByStartTimeUseCase } from 'src/university/application/use-cases/schedule/find-schedule-by-start-time.use-case';
import { FindScheduleByTypeUseCase } from 'src/university/application/use-cases/schedule/find-schedule-by-type.use-case';
import { FindTodaysScheduleUseCase } from 'src/university/application/use-cases/schedule/find-schedule-today.use-case';
import { UpdateScheduleUseCase } from 'src/university/application/use-cases/schedule/update-schedule.use-case';

const ScheduleUseCases = [
  CreateScheduleUseCase,
  DeleteScheduleUseCase,
  FindAllSchedulesWithDetailsUseCase,
  FindAllSchedulesUseCase,
  FindScheduleByDayUseCase,
  FindScheduleByEnrollUseCase,
  FindScheduleByIdUseCase,
  FindScheduleByLocationUseCase,
  FindSchedulesByStartTimeUseCase,
  FindScheduleByTypeUseCase,
  FindTodaysScheduleUseCase,
  UpdateScheduleUseCase,
];

@Module({
  imports: [PrismaModule, AuthModule, EnrollmentModule],
  controllers: [ScheduleController],
  providers: [
    {
      provide: 'ScheduleRepository',
      useClass: PrismaScheduleRepository,
    },
    ...ScheduleUseCases,
  ],
  exports: ['ScheduleRepository', ...ScheduleUseCases],
})
export class ScheduleModule {}
