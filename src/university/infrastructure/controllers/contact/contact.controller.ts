import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { GetUser } from 'src/auth/infrastructure/decorators/get-user.decorator';
import { AuthGuard } from 'src/auth/infrastructure/guards/auth.guard';
import { CreateContactUseCase } from 'src/university/application/use-cases/contact/create-contact.use-case';
import { DeleteContactUseCase } from 'src/university/application/use-cases/contact/delete-contact.use-case';
import { FindAllContactsWithDetailsUseCase } from 'src/university/application/use-cases/contact/find-all-contacts-detail.use-case';
import { FindAllContactsUseCase } from 'src/university/application/use-cases/contact/find-all-contacts.use-case';
import { FindContactsByEnrollmentUseCase } from 'src/university/application/use-cases/contact/find-contact-by-enroll.use-case';
import { FindContactByIdUseCase } from 'src/university/application/use-cases/contact/find-contact-by-id.use-case';
import { FindContactsByCareerUseCase } from 'src/university/application/use-cases/contact/find-contacts-by-career.use-case';
import { FindContactsByInstitutionUseCase } from 'src/university/application/use-cases/contact/find-contacts-by-institution.use-case';
import { FindContactsByNameUseCase } from 'src/university/application/use-cases/contact/find-contacts-by-name.use-case';
import { FindContactsByRoleUseCase } from 'src/university/application/use-cases/contact/find-contacts-by-role.use-case';
import { FindContactsBySubjectUseCase } from 'src/university/application/use-cases/contact/find-contacts-by-subject.use-case';
import { UpdateContactUseCase } from 'src/university/application/use-cases/contact/update-contact.use-case';
import { ContactRule } from 'src/university/domain/enums/contact-role.enum';
import { CreateContactDto } from 'src/university/dto/contact/create-contact.dto';
import { UpdateContactDto } from 'src/university/dto/contact/update-contact.dto';

@Controller('university/contacts')
@UseGuards(AuthGuard)
export class ContactController {
  constructor(
    private readonly createUseCase: CreateContactUseCase,
    private readonly updateUseCase: UpdateContactUseCase,
    private readonly deleteUseCase: DeleteContactUseCase,
    private readonly findAllDetailsUseCase: FindAllContactsWithDetailsUseCase,
    private readonly findByIdUseCase: FindContactByIdUseCase,
    private readonly findByInstitutionUseCase: FindContactsByInstitutionUseCase,
    private readonly findAllUseCase: FindAllContactsUseCase,
    private readonly findByNameUseCase: FindContactsByNameUseCase,
    private readonly findByRoleUseCase: FindContactsByRoleUseCase,
    private readonly findByEnrollmentUseCase: FindContactsByEnrollmentUseCase,
    private readonly findBySubjectUseCase: FindContactsBySubjectUseCase,
    private readonly findByCareerUseCase: FindContactsByCareerUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateContactDto, @GetUser('id') userId: string) {
    return await this.createUseCase.execute(dto, userId);
  }

  @Get()
  async findAll(@GetUser('id') userId: string) {
    return await this.findAllUseCase.execute(userId);
  }

  @Get('agenda')
  async getAgenda(@GetUser('id') userId: string) {
    return await this.findAllDetailsUseCase.execute(userId);
  }

  @Get('search/name')
  async searchContactByName(
    @Query('q') name: string,
    @GetUser('id') userId: string,
  ) {
    return await this.findByNameUseCase.execute(name, userId);
  }

  @Get('search/role')
  async searchContactByRole(
    @Query('role') role: ContactRule,
    @GetUser('id') userId: string,
  ) {
    return await this.findByRoleUseCase.execute(role, userId);
  }

  @Get('search/institution')
  async searchContactByInstitution(
    @Query('q') institution: string,
    @GetUser('id') userId: string,
  ) {
    return await this.findByInstitutionUseCase.execute(institution, userId);
  }

  @Get('enrollment/:enrollmentId')
  async findByEnrollment(
    @Param('enrollmentId', ParseUUIDPipe) enrollmentId: string,
    @GetUser('id') userId: string,
  ) {
    return await this.findByEnrollmentUseCase.execute(enrollmentId, userId);
  }

  @Get('subject/:subjectId')
  async findContactBySubject(
    @Param('subjectId', ParseUUIDPipe) subjectId: string,
    @GetUser('id') userId: string,
  ) {
    return await this.findBySubjectUseCase.execute(subjectId, userId);
  }

  @Get('career/:careerId')
  async findContactByCareer(
    @Param('careerId', ParseUUIDPipe) careerId: string,
    @GetUser('id') userId: string,
  ) {
    return await this.findByCareerUseCase.execute(careerId, userId);
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
    @Body() dto: UpdateContactDto,
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
