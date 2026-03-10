import { Module } from '@nestjs/common';
import { CareerModule } from './career.module';
import { EnrollmentModule } from './enroll.module';
import { SubjectModule } from './subject.module';
import { EvaluationModule } from './evaluation.module';
import { ScheduleModule } from './schedule.module';
import { ContactModule } from './contact.module';
import { ResourceModule } from './resource.module';
import { TaskModule } from 'src/task/task.module';
import { UniversityController } from './infrastructure/controllers/university.controller';
import { GetTodayClassesUseCase } from './application/use-cases/widgets/get-today-classes.use-case';
import { GetUpcomingEvaluationsUseCase } from './application/use-cases/widgets/get-upcoming-evaluations.use-case';
import { GetPendingAcademicTasksUseCase } from './application/use-cases/widgets/get-pending-academic-tasks.use-case';

const WidgetUseCases = [
  GetTodayClassesUseCase,
  GetUpcomingEvaluationsUseCase,
  GetPendingAcademicTasksUseCase,
];

@Module({
  imports: [
    CareerModule,
    SubjectModule,
    EnrollmentModule,
    EvaluationModule,
    ScheduleModule,
    ContactModule,
    ResourceModule,
    TaskModule,
  ],
  controllers: [UniversityController],
  providers: [...WidgetUseCases],
  exports: [
    CareerModule,
    SubjectModule,
    EnrollmentModule,
    EvaluationModule,
    ScheduleModule,
    ContactModule,
    ResourceModule,
    TaskModule,
    ...WidgetUseCases,
  ],
})
export class UniversityModule {}
