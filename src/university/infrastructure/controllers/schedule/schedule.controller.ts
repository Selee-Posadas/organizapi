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
  ParseUUIDPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { GetUser } from 'src/auth/infrastructure/decorators/get-user.decorator';
import { AuthGuard } from 'src/auth/infrastructure/guards/auth.guard';
import { CreateScheduleUseCase } from 'src/university/application/use-cases/schedule/create-schedule.use-case';
import { DeleteScheduleUseCase } from 'src/university/application/use-cases/schedule/delete-schedule.use-case';
import { FindAllSchedulesWithDetailsUseCase } from 'src/university/application/use-cases/schedule/find-all-schedule-with-detail.use-case';
import { FindAllSchedulesUseCase } from 'src/university/application/use-cases/schedule/find-all-schedule.use-case';
import { FindScheduleByDayUseCase } from 'src/university/application/use-cases/schedule/find-schedule-by-day.use-case';
import { FindScheduleByEnrollUseCase } from 'src/university/application/use-cases/schedule/find-schedule-by-enroll.use-case';
import { FindScheduleByIdUseCase } from 'src/university/application/use-cases/schedule/find-schedule-by-id.use-case';
import { FindScheduleByLocationUseCase } from 'src/university/application/use-cases/schedule/find-schedule-by-location.use-case';
import { FindSchedulesByStartTimeUseCase } from 'src/university/application/use-cases/schedule/find-schedule-by-start-time.use-case';
import { FindScheduleByTypeUseCase } from 'src/university/application/use-cases/schedule/find-schedule-by-type.use-case';
import { FindTodaysScheduleUseCase } from 'src/university/application/use-cases/schedule/find-schedule-today.use-case';
import { UpdateScheduleUseCase } from 'src/university/application/use-cases/schedule/update-schedule.use-case';

import { DayOfWeek } from 'src/university/domain/enums/day-of-week.enum';
import { ScheduleType } from 'src/university/domain/enums/schedule-type.enum';
import { CreateScheduleDto } from 'src/university/dto/schedule/create-schedule.dto';
import { UpdateScheduleDto } from 'src/university/dto/schedule/update-schedule.dto';

@Controller('university/schedule')
@UseGuards(AuthGuard)
export class ScheduleController {
  constructor(
    private readonly createUseCase: CreateScheduleUseCase,
    private readonly updateUseCase: UpdateScheduleUseCase,
    private readonly deleteUseCase: DeleteScheduleUseCase,
    private readonly findByIdUseCase: FindScheduleByIdUseCase,
    private readonly findAllUseCase: FindAllSchedulesUseCase,
    private readonly findAllDetailsUseCase: FindAllSchedulesWithDetailsUseCase,
    private readonly findTodayUseCase: FindTodaysScheduleUseCase,
    private readonly findByDayUseCase: FindScheduleByDayUseCase,
    private readonly findByEnrollUseCase: FindScheduleByEnrollUseCase,
    private readonly findByLocationUseCase: FindScheduleByLocationUseCase,
    private readonly findByStartTimeUseCase: FindSchedulesByStartTimeUseCase,
    private readonly findByTypeUseCase: FindScheduleByTypeUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateScheduleDto, @GetUser('id') userId: string) {
    return await this.createUseCase.execute(dto, userId);
  }

  @Get('today')
  async findToday(@GetUser('id') userId: string) {
    return await this.findTodayUseCase.execute(userId);
  }

  @Get('details')
  async findAllWithDetails(@GetUser('id') userId: string) {
    return await this.findAllDetailsUseCase.execute(userId);
  }

  @Get('search/day/:day')
  async findByDay(
    @Param('day', ParseIntPipe) day: DayOfWeek,
    @GetUser('id') userId: string,
  ) {
    return await this.findByDayUseCase.execute(day, userId);
  }

  @Get('search/type/:type')
  async findByType(
    @Param('type') type: ScheduleType,
    @GetUser('id') userId: string,
  ) {
    return await this.findByTypeUseCase.execute(type, userId);
  }

  @Get('search/location')
  async findByLocation(
    @Query('location') location: string,
    @GetUser('id') userId: string,
  ) {
    return await this.findByLocationUseCase.execute(location, userId);
  }

  @Get('search/time')
  async findByStartTime(
    @Query('start') startTime: string,
    @GetUser('id') userId: string,
  ) {
    return await this.findByStartTimeUseCase.execute(startTime, userId);
  }

  @Get('enrollment/:enrollmentId')
  async findByEnroll(
    @Param('enrollmentId', ParseUUIDPipe) enrollmentId: string,
    @GetUser('id') userId: string,
  ) {
    return await this.findByEnrollUseCase.execute(enrollmentId, userId);
  }

  @Get()
  async findAll(@GetUser('id') userId: string) {
    return await this.findAllUseCase.execute(userId);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser('id') userId: string,
  ) {
    return await this.findByIdUseCase.execute(id, userId);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateScheduleDto,
    @GetUser('id') userId: string,
  ) {
    return await this.updateUseCase.execute(id, userId, dto);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser('id') userId: string,
  ) {
    return await this.deleteUseCase.execute(id, userId);
  }
}
