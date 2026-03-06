import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
    ParseUUIDPipe
} from "@nestjs/common";
import { AuthGuard } from "src/auth/infrastructure/guards/auth.guard";
import { GetUser } from "src/auth/infrastructure/decorators/get-user.decorator";

import { CreateTaskUseCase } from "src/task/application/use-cases/create-task.use-case";
import { UpdateTaskUseCase } from "src/task/application/use-cases/update-task.use-case";
import { DeleteTaskUseCase } from "src/task/application/use-cases/delete-task.use-case";
import { FindTasksForDailyWidgetUseCase } from "src/task/application/use-cases/find-tasks-for-daily-widget.use-case";
import { FindAllTasksUseCase } from "src/task/application/use-cases/find-all-task.use-case";
import { FindTaskByIdUseCase } from "src/task/application/use-cases/find-by-id.use-case";
import { FindTasksByCategoryUseCase } from "src/task/application/use-cases/find-task-by-category.use-case";
import { CreateTaskDto } from "src/task/dto/create-task.dto";
import { UpdateTaskDto } from "src/task/dto/update-task.dto";

@Controller('tasks')
@UseGuards(AuthGuard)
export class TaskController {
    constructor(
        private readonly createUseCase: CreateTaskUseCase,
        private readonly updateUseCase: UpdateTaskUseCase,
        private readonly deleteUseCase: DeleteTaskUseCase,
        private readonly findAllUseCase: FindAllTasksUseCase,
        private readonly findByIdUseCase: FindTaskByIdUseCase,
        private readonly findByCategoryUseCase: FindTasksByCategoryUseCase,
        private readonly findDailyUseCase: FindTasksForDailyWidgetUseCase,
    ) { }


    @Get('daily')
    async getDailyTasks(
        @GetUser('id') userId: string,
        @Query('date') date?: string
    ) {

        return await this.findDailyUseCase.execute(userId, date);
    }


    @Post()
    async create(@Body() dto: CreateTaskDto, @GetUser('id') userId: string) {
        return await this.createUseCase.execute(dto, userId);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateTaskDto,
        @GetUser('id') userId: string
    ) {
        return await this.updateUseCase.execute(id, userId, dto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id: string, @GetUser('id') userId: string) {
        return await this.deleteUseCase.execute(id, userId);
    }


    @Get()
    async findAll(@GetUser('id') userId: string) {
        return await this.findAllUseCase.execute(userId);
    }

    @Get('category/:categoryId')
    async findByCategory(
        @Param('categoryId', ParseUUIDPipe) categoryId: string,
        @GetUser('id') userId: string
    ) {
        return await this.findByCategoryUseCase.execute(categoryId, userId);
    }

    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string, @GetUser('id') userId: string) {
        return await this.findByIdUseCase.execute(id, userId);
    }
}