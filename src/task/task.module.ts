import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';

import { TaskController } from './infrastructure/controllers/task.controller';

import { CreateTaskUseCase } from './application/use-cases/create-task.use-case';
import { UpdateTaskUseCase } from './application/use-cases/update-task.use-case';
import { DeleteTaskUseCase } from './application/use-cases/delete-task.use-case';
import { FindTasksForDailyWidgetUseCase } from './application/use-cases/find-tasks-for-daily-widget.use-case';
import { FindAllTasksUseCase } from './application/use-cases/find-all-task.use-case';
import { FindTaskByIdUseCase } from './application/use-cases/find-by-id.use-case';
import { FindTasksByCategoryUseCase } from './application/use-cases/find-task-by-category.use-case';
import { PrismaTaskRepository } from './infrastructure/repositories/prisma-task.repository';

const TaskUseCases = [
  CreateTaskUseCase,
  UpdateTaskUseCase,
  DeleteTaskUseCase,
  FindAllTasksUseCase,
  FindTaskByIdUseCase,
  FindTasksByCategoryUseCase,
  FindTasksForDailyWidgetUseCase,
];

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [TaskController],
  providers: [
    {
      provide: 'TaskRepository',
      useClass: PrismaTaskRepository,
    },
    ...TaskUseCases,
  ],
  exports: ['TaskRepository', ...TaskUseCases],
})
export class TaskModule {}
