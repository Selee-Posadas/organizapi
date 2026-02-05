import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, NotFoundException, 
  ForbiddenException, 
  InternalServerErrorException } from '@nestjs/common';
import { UpdateTaskUseCase } from '../../application/use-cases/update-task.use-case';
import { DeleteTaskUseCase } from 'src/task/application/use-cases/delete-task.use-case';
import { CreateTaskUseCase } from 'src/task/application/use-cases/create-task.use-case';
import { AuthGuard } from 'src/auth/infrastructure/guards/auth.guard';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { UpdateTaskDto } from 'src/task/dto/update-task.dto';
import { FindAllTaskUseCase } from 'src/task/application/use-cases/find-all-task.use-case';
import { FindByIdUseCase } from 'src/task/application/use-cases/find-by-id.use-case';

@Controller('tasks')
export class TaskController {
    constructor(
        private readonly updateTaskUseCase: UpdateTaskUseCase,
        private readonly deleteTaskUseCase: DeleteTaskUseCase,
        private readonly createTaskUseCase: CreateTaskUseCase,
        private readonly findAllTaskUseCase: FindAllTaskUseCase,
        private readonly findByIdUseCase: FindByIdUseCase,
    ) { }
    @Get()
    @UseGuards(AuthGuard)
    async findAll(@Req() req) {
        try {
            const tasks = await this.findAllTaskUseCase.execute(req.user.id);
            return tasks;

        } catch (error) {
            this.handleErrors(error);
        }
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async findOne(
        @Param('id') taskId: string,
        @Req() req
    ) {
        try {
            const task = await this.findByIdUseCase.execute(taskId, req.user.id);
            return task;
        } catch (error) {
            this.handleErrors(error);
        }
    }

    @Post()
    @UseGuards(AuthGuard)
    async create(@Req() req, @Body() createTaskDto: CreateTaskDto) {
        try {
            const task = await this.createTaskUseCase.execute(createTaskDto, req.user.id);
            return {
                message: 'Task created successfully',
                task,
            };

        } catch (error) {
            this.handleErrors(error);
        }
    }
    @Patch(':id')
    @UseGuards(AuthGuard)
    async update(
        @Param('id') taskId: string,
        @Req() req,
        @Body() updateTaskDto: UpdateTaskDto
    ) {
        try {
            const updatedTask = await this.updateTaskUseCase.execute(req.user.id, taskId, updateTaskDto);
            return {
                message: 'Task updated successfully',
                task: updatedTask,
            };


        } catch (error) {
            this.handleErrors(error);
        }
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async delete(
        @Param('id') taskId: string,
        @Req() req
    ) {
        try {
            await this.deleteTaskUseCase.execute(req.user.id, taskId);
            return {
                message: 'Task deleted successfully',
            };
        } catch (error) {
            this.handleErrors(error);
        }

    }



    private handleErrors(error: any) {
        if (error.message === 'Task not found') {
            throw new NotFoundException(error.message);
        }
        if (error.message.includes('permission')) {
            throw new ForbiddenException(error.message);
        }
        
        throw new InternalServerErrorException('An unexpected error occurred'); 
    }
}