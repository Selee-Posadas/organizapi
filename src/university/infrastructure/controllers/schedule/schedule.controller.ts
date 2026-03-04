
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { GetUser } from "src/auth/infrastructure/decorators/get-user.decorator";
import { AuthGuard } from "src/auth/infrastructure/guards/auth.guard";
import { CreateScheduleUseCase } from "src/university/application/use-cases/schedule/create-schedule.use-case";
import { DeleteScheduleUseCase } from "src/university/application/use-cases/schedule/delete-schedule.use-case";
import { GetTodaySchedulesUseCase } from "src/university/application/use-cases/schedule/get-today-schedules.use-case";
import { CreateScheduleDto } from "src/university/dto/schedule/create-schedule.dto";

@Controller('schedule')
@UseGuards(AuthGuard)
export class ScheduleController {
    constructor(
        private readonly createUseCase: CreateScheduleUseCase,
        private readonly deleteUseCase: DeleteScheduleUseCase,
        private readonly getTodayUseCase: GetTodaySchedulesUseCase
    ) { }

    @Post('')
    async create(@Body() dto: CreateScheduleDto, @GetUser('id') userId: string) {
        return await this.createUseCase.execute(dto, userId);
    }

    @Get('today')
    async getToday(@GetUser('id') userId: string) {
        return await this.getTodayUseCase.execute(userId);
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @GetUser('id') userId: string) {
        return await this.deleteUseCase.execute(id, userId);
    }
}