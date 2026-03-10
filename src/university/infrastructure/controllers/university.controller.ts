import {
  Controller,
  Get,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { GetUser } from 'src/auth/infrastructure/decorators/get-user.decorator';
import { AuthGuard } from 'src/auth/infrastructure/guards/auth.guard';
import { EnergyLevel } from 'src/task/domain/enum/task-energy.enum';
import { GetTodayClassesUseCase } from 'src/university/application/use-cases/widgets/get-today-classes.use-case';
import { GetUpcomingEvaluationsUseCase } from 'src/university/application/use-cases/widgets/get-upcoming-evaluations.use-case';
import { GetPendingAcademicTasksUseCase } from 'src/university/application/use-cases/widgets/get-pending-academic-tasks.use-case';

@Controller('university')
@UseGuards(AuthGuard)
export class UniversityController {
  constructor(
    private readonly getTodayClassesUseCase: GetTodayClassesUseCase,
    private readonly getUpcomingEvaluationsUseCase: GetUpcomingEvaluationsUseCase,
    private readonly getPendingAcademicTasksUseCase: GetPendingAcademicTasksUseCase,
  ) {}

  @Get('overview')
  async getOverview(
    @GetUser('id', new ParseUUIDPipe()) userId: string,
    @Query('energyFilter') energyFilter?: EnergyLevel,
  ) {
    const [todayClasses, upcomingEvaluations, pendingTasks] = await Promise.all(
      [
        this.getTodayClassesUseCase.execute(userId),
        this.getUpcomingEvaluationsUseCase.execute(userId),
        this.getPendingAcademicTasksUseCase.execute(userId, energyFilter),
      ],
    );

    return {
      todayClasses,
      upcomingEvaluations,
      pendingAcademicTasks: pendingTasks,
    };
  }
}
