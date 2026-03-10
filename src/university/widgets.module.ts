import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UniversityModule } from 'src/university/university.module';
import { TaskModule } from 'src/task/task.module';
import { WidgetsController } from './infrastructure/controllers/widgets/widgets.controller';
import { GetTodayClassesUseCase } from './application/use-cases/widgets/get-today-classes.use-case';
import { GetUpcomingEvaluationsUseCase } from './application/use-cases/widgets/get-upcoming-evaluations.use-case';
import { GetPendingAcademicTasksUseCase } from './application/use-cases/widgets/get-pending-academic-tasks.use-case';
const WidgetUseCases = [
  GetTodayClassesUseCase,
  GetUpcomingEvaluationsUseCase,
  GetPendingAcademicTasksUseCase,
];

@Module({
  imports: [AuthModule, UniversityModule, TaskModule],
  controllers: [WidgetsController],
  providers: [...WidgetUseCases],
  exports: [...WidgetUseCases],
})
export class WidgetsModule {}