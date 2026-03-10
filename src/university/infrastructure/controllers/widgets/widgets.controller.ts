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
import { GetPendingAcademicTasksUseCase } from 'src/university/application/use-cases/widgets/get-pending-academic-tasks.use-case';
import { GetTodayClassesUseCase } from 'src/university/application/use-cases/widgets/get-today-classes.use-case';
import { GetUpcomingEvaluationsUseCase } from 'src/university/application/use-cases/widgets/get-upcoming-evaluations.use-case';

@Controller('widgets')
@UseGuards(AuthGuard)
export class WidgetsController {
  constructor(
    private readonly getTodayClassesUseCase: GetTodayClassesUseCase,
    private readonly getUpcomingEvaluationsUseCase: GetUpcomingEvaluationsUseCase,
    private readonly getPendingAcademicTasksUseCase: GetPendingAcademicTasksUseCase,
  ) {}

  @Get('today-classes')
  async getTodayClasses(@GetUser('id', new ParseUUIDPipe()) userId: string) {
    return await this.getTodayClassesUseCase.execute(userId);
  }

  @Get('upcoming-evaluations')
  async getUpcomingEvaluations(
    @GetUser('id', new ParseUUIDPipe()) userId: string,
  ) {
    return await this.getUpcomingEvaluationsUseCase.execute(userId);
  }

  @Get('pending-academic-tasks')
  async getPendingAcademicTasks(
    @GetUser('id', new ParseUUIDPipe()) userId: string,
    @Query('energyFilter') energyFilter?: EnergyLevel,
  ) {
    return await this.getPendingAcademicTasksUseCase.execute(
      userId,
      energyFilter,
    );
  }
}
