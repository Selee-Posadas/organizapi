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
import { CreateCareerUseCase } from 'src/university/application/use-cases/career/create-career.use-case';
import { UpdateCareerUseCase } from 'src/university/application/use-cases/career/update-career.use-case';
import { DeleteCareerUseCase } from 'src/university/application/use-cases/career/delete-career.use-case';
import { FindAllCareersUseCase } from 'src/university/application/use-cases/career/find-all-careers.use-case';
import { FindCareerByIdUseCase } from 'src/university/application/use-cases/career/find-career-by-id.use-case';
import { FindCareersByNameUseCase } from 'src/university/application/use-cases/career/find-careers-by-name.use-case';
import { FindCareersByTypeUseCase } from 'src/university/application/use-cases/career/find-careers-by-type.use-case';
import { FindCareersByInstitutionUseCase } from 'src/university/application/use-cases/career/find-careers-by-institution.use-case';
import { CreateCareerDto } from 'src/university/dto/career/create-career.dto';
import { UpdateCareerDto } from 'src/university/dto/career/update-career.dto';
import { StudyType } from 'src/university/domain/enums/study-type.enum';

@Controller('university/career')
@UseGuards(AuthGuard)
export class CareerController {
  constructor(
    private readonly createUseCase: CreateCareerUseCase,
    private readonly updateUseCase: UpdateCareerUseCase,
    private readonly deleteUseCase: DeleteCareerUseCase,
    private readonly findAllUseCase: FindAllCareersUseCase,
    private readonly findByIdUseCase: FindCareerByIdUseCase,
    private readonly findByNameUseCase: FindCareersByNameUseCase,
    private readonly findByTypeUseCase: FindCareersByTypeUseCase,
    private readonly findByInstitutionUseCase: FindCareersByInstitutionUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateCareerDto, @GetUser('id') userId: string) {
    return await this.createUseCase.execute(dto, userId);
  }

  @Get()
  async findAll(@GetUser('id') userId: string) {
    return await this.findAllUseCase.execute(userId);
  }

  @Get('search/name')
  async searchByName(@Query('q') name: string, @GetUser('id') userId: string) {
    return await this.findByNameUseCase.execute(name, userId);
  }

  @Get('search/type')
  async searchByType(
    @Query('type') type: StudyType,
    @GetUser('id') userId: string,
  ) {
    return await this.findByTypeUseCase.execute(type, userId);
  }

  @Get('search/institution')
  async searchByInstitution(
    @Query('q') inst: string,
    @GetUser('id') userId: string,
  ) {
    return await this.findByInstitutionUseCase.execute(inst, userId);
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
    @Body() dto: UpdateCareerDto,
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
