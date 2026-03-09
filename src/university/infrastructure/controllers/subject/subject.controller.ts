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

// DTOs
import { CreateSubjectDto } from 'src/university/dto/subject/create-subject.dto';
import { UpdateSubjectDto } from 'src/university/dto/subject/update-subject.dto';

// Enums
import { EnrollmentStatus } from 'src/university/domain/enums/enrollment-status.enum';

// Use Cases
import { AddSubjectUseCase } from 'src/university/application/use-cases/subject/add-subject.use-case';
import { UpdateSubjectUseCase } from 'src/university/application/use-cases/subject/update-subject.use-case';
import { DeleteSubjectUseCase } from 'src/university/application/use-cases/subject/delete-subject.use-case';
import { FindSubjectByIdUseCase } from 'src/university/application/use-cases/subject/find-subject-by-id.use-case';
import { FindSubjectByNameUseCase } from 'src/university/application/use-cases/subject/find-subject-by-name.use-case';
import { FindSubjectsByCareerUseCase } from 'src/university/application/use-cases/subject/find-subjects-by-career.use-case';
import { GetCorrelativesUseCase } from 'src/university/application/use-cases/subject/get-correlatives.use-case';
import { AddCorrelativeUseCase } from 'src/university/application/use-cases/subject/add-correlative.use-case';
import { RemoveCorrelativeUseCase } from 'src/university/application/use-cases/subject/remove-correlative.use-case';

@Controller('university/subject')
@UseGuards(AuthGuard)
export class SubjectController {
  constructor(
    private readonly addUseCase: AddSubjectUseCase,
    private readonly updateUseCase: UpdateSubjectUseCase,
    private readonly deleteUseCase: DeleteSubjectUseCase,
    private readonly findByIdUseCase: FindSubjectByIdUseCase,
    private readonly findByNameUseCase: FindSubjectByNameUseCase,
    private readonly findByCareerUseCase: FindSubjectsByCareerUseCase,
    private readonly getCorrelativesUseCase: GetCorrelativesUseCase,
    private readonly addCorrelativeUseCase: AddCorrelativeUseCase,
    private readonly removeCorrelativeUseCase: RemoveCorrelativeUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateSubjectDto, @GetUser('id') userId: string) {
    return await this.addUseCase.execute(dto, userId);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateSubjectDto,
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

  @Get('career/:careerId')
  async findByCareer(
    @Param('careerId', ParseUUIDPipe) careerId: string,
    @GetUser('id') userId: string,
  ) {
    return await this.findByCareerUseCase.execute(careerId, userId);
  }

  @Get('search')
  async findByName(@Query('name') name: string, @GetUser('id') userId: string) {
    return await this.findByNameUseCase.execute(name, userId);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser('id') userId: string,
  ) {
    return await this.findByIdUseCase.execute(id, userId);
  }

  @Get(':id/correlatives')
  async getCorrelatives(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser('id') userId: string,
  ) {
    return await this.getCorrelativesUseCase.execute(id, userId);
  }

  @Post(':id/correlative/:requiredId')
  async addCorrelative(
    @Param('id', ParseUUIDPipe) subjectId: string,
    @Param('requiredId', ParseUUIDPipe) requiredId: string,
    @Body('type') type: EnrollmentStatus,
    @GetUser('id') userId: string,
  ) {
    return await this.addCorrelativeUseCase.execute(
      subjectId,
      requiredId,
      type,
      userId,
    );
  }

  @Delete(':id/correlative/:requiredId')
  async removeCorrelative(
    @Param('id', ParseUUIDPipe) subjectId: string,
    @Param('requiredId', ParseUUIDPipe) requiredId: string,
    @GetUser('id') userId: string,
  ) {
    return await this.removeCorrelativeUseCase.execute(
      subjectId,
      requiredId,
      userId,
    );
  }
}
