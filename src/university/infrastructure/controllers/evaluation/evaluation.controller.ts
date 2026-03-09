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
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/infrastructure/guards/auth.guard';
import { GetUser } from 'src/auth/infrastructure/decorators/get-user.decorator';

import { CreateEvaluationDto } from 'src/university/dto/evaluation/create-evaluation.dto';
import { UpdateEvaluationDto } from 'src/university/dto/evaluation/update-evaluation.dto';

import { EvaluationType } from 'src/university/domain/enums/evaluation-type.enum';

import { CreateEvaluationUseCase } from 'src/university/application/use-cases/evaluation/create-evaluation.use-case';
import { UpdateEvaluationUseCase } from 'src/university/application/use-cases/evaluation/update-evaluation.use-case';
import { DeleteEvaluationUseCase } from 'src/university/application/use-cases/evaluation/delete-evaluation.use-case';
import { FindEvaluationByIdUseCase } from 'src/university/application/use-cases/evaluation/find-evaluation-by-id.use-case';
import { FindAllEvaluationUseCase } from 'src/university/application/use-cases/evaluation/find-all-evaluation.use-case';
import { FindAllEvaluationWithDetailsUseCase } from 'src/university/application/use-cases/evaluation/find-all-evaluation-details.use-case';
import { FindEvaluationByTypeUseCase } from 'src/university/application/use-cases/evaluation/find-evaluation-by-type.use-case';
import { FindEvaluationByDayUseCase } from 'src/university/application/use-cases/evaluation/find-evaluation-by-day.use-case';
import { FindEvaluationByStatusUseCase } from 'src/university/application/use-cases/evaluation/find-evaluation-by-status.use-case';
import { FindEvaluationByEnrollmentUseCase } from 'src/university/application/use-cases/evaluation/find-evaluation-by-enroll.use-case';

@Controller('university/evaluation')
@UseGuards(AuthGuard)
export class EvaluationController {
  constructor(
    private readonly createUseCase: CreateEvaluationUseCase,
    private readonly updateUseCase: UpdateEvaluationUseCase,
    private readonly deleteUseCase: DeleteEvaluationUseCase,
    private readonly findByIdUseCase: FindEvaluationByIdUseCase,
    private readonly findAllUseCase: FindAllEvaluationUseCase,
    private readonly findAllDetailsUseCase: FindAllEvaluationWithDetailsUseCase,
    private readonly findByTypeUseCase: FindEvaluationByTypeUseCase,
    private readonly findByDayUseCase: FindEvaluationByDayUseCase,
    private readonly findByStatusUseCase: FindEvaluationByStatusUseCase,
    private readonly findByEnrollmentUseCase: FindEvaluationByEnrollmentUseCase,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateEvaluationDto,
    @GetUser('id') userId: string,
  ) {
    return await this.createUseCase.execute(dto, userId);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateEvaluationDto,
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

  @Get('details')
  async findAllWithDetails(@GetUser('id') userId: string) {
    return await this.findAllDetailsUseCase.execute(userId);
  }

  @Get('search/type/:type')
  async findByType(
    @Param('type') type: EvaluationType,
    @GetUser('id') userId: string,
  ) {
    return await this.findByTypeUseCase.execute(type, userId);
  }

  @Get('search/status/:status')
  async findByStatus(
    @Param('status') status: string,
    @GetUser('id') userId: string,
  ) {
    return await this.findByStatusUseCase.execute(status, userId);
  }

  @Get('search/day')
  async findByDay(
    @Query('date') dateStr: string,
    @GetUser('id') userId: string,
  ) {
    const date = new Date(dateStr);
    return await this.findByDayUseCase.execute(date, userId);
  }

  @Get('enrollment/:enrollmentId')
  async findByEnrollment(
    @Param('enrollmentId', ParseUUIDPipe) enrollmentId: string,
    @GetUser('id') userId: string,
  ) {
    return await this.findByEnrollmentUseCase.execute(enrollmentId, userId);
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
}
