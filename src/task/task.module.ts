import { Module } from '@nestjs/common';
import { TaskController } from './infrastructure/controllers/task.controller';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { PrismaTaskRepository } from './infrastructure/repositories/prisma-task.repository';
import { UpdateTaskUseCase } from './application/use-cases/update-task.use-case';
import { TaskRepository } from './domain/repositories/task.repository';
import { CreateTaskUseCase } from './application/use-cases/create-task.use-case';
import { DeleteTaskUseCase } from './application/use-cases/delete-task.use-case';
import { AuthModule } from 'src/auth/auth.module';
import { FindAllTaskUseCase } from './application/use-cases/find-all-task.use-case';
import { FindByIdUseCase } from './application/use-cases/find-by-id.use-case';


@Module({
  imports: [AuthModule],
  controllers: [TaskController],
  providers: [
    {
      provide: 'TaskRepository',
      useClass: PrismaTaskRepository,
    },
    {
      provide: FindAllTaskUseCase,
      useFactory: (taskRepo: TaskRepository) => {
        return new FindAllTaskUseCase(taskRepo);
      },
      inject: ['TaskRepository'],
    },
    {
      provide: FindByIdUseCase,
      useFactory: (taskRepo: TaskRepository) => {
        return new FindByIdUseCase(taskRepo);
      },
      inject: ['TaskRepository'],
    },
    {
      provide: CreateTaskUseCase,
      useFactory: (taskRepo: TaskRepository) => {
        return new CreateTaskUseCase(taskRepo);
      },
      inject: ['TaskRepository'],
    },
    {
      provide: UpdateTaskUseCase,
      useFactory: (taskRepo: TaskRepository) => {
        return new UpdateTaskUseCase(taskRepo);
      },
      inject: ['TaskRepository'],
    },
    {
      provide: DeleteTaskUseCase,
      useFactory: (taskRepo: TaskRepository) => {
        return new DeleteTaskUseCase(taskRepo);
      },
      inject: ['TaskRepository'],
    },

    PrismaService,
  ],
})
export class TaskModule { }
