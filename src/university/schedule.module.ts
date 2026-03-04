import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { PrismaModule } from "src/infrastructure/prisma/prisma.module";
import { EnrollmentModule } from "./enroll.module";
import { ScheduleController } from "./infrastructure/controllers/schedule/schedule.controller";
import { PrismaScheduleRepository } from "./infrastructure/repositories/prisma-schedule.repository";
import { DeleteScheduleUseCase } from "./application/use-cases/schedule/delete-schedule.use-case";
import { GetTodaySchedulesUseCase } from "./application/use-cases/schedule/get-today-schedules.use-case";
import { EnrollmentRepository } from "./domain/repositories/enrollment.repository";
import { ScheduleRepository } from "./domain/repositories/schedule.repository";
import { CreateScheduleUseCase } from "./application/use-cases/schedule/create-schedule.use-case";


@Module({
  imports: [PrismaModule, AuthModule, EnrollmentModule],
  controllers: [ScheduleController],
  providers: [
    {
      provide: 'ScheduleRepository',
      useClass: PrismaScheduleRepository,
    },
    {
      provide: CreateScheduleUseCase,
      useFactory: (sRepo: ScheduleRepository, eRepo: EnrollmentRepository) => 
        new CreateScheduleUseCase(sRepo, eRepo),
      inject: ['ScheduleRepository', 'EnrollmentRepository'],
    },
    {
      provide: DeleteScheduleUseCase,
      useFactory: (sRepo: ScheduleRepository) => new DeleteScheduleUseCase(sRepo),
      inject: ['ScheduleRepository'],
    },
    {
      provide: GetTodaySchedulesUseCase,
      useFactory: (sRepo: ScheduleRepository) => new GetTodaySchedulesUseCase(sRepo),
      inject: ['ScheduleRepository'],
    },
  ],
})
export class ScheduleModule {}