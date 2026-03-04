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
    ParseIntPipe
} from "@nestjs/common";
import { AuthGuard } from "src/auth/infrastructure/guards/auth.guard";
import { GetUser } from "src/auth/infrastructure/decorators/get-user.decorator";

import { EnrollInSubjectUseCase } from "src/university/application/use-cases/enrollment/enroll-in-subject.use-case";
import { UpdateEnrollmentUseCase } from "src/university/application/use-cases/enrollment/update-enrollment.use-case";
import { DeleteEnrollmentUseCase } from "src/university/application/use-cases/enrollment/delete-enrollment.use-case";
import { FindAllEnrollmentsUseCase } from "src/university/application/use-cases/enrollment/find-all-enrollments.use-case";
import { FindEnrollmentByIdUseCase } from "src/university/application/use-cases/enrollment/find-enrollment-by-id.use-case";
import { FindEnrollmentByStatusUseCase } from "src/university/application/use-cases/enrollment/find-enrollment-by-status.use-case";
import { FindEnrollmentByYearUseCase } from "src/university/application/use-cases/enrollment/find-enrollment-by-year.use-case";
import { FindEnrollmentBySubjectUseCase } from "src/university/application/use-cases/enrollment/find-enrollment-by-subject.use-case";
import { FindAllEnrollmentsWithDetailsUseCase } from '../../../application/use-cases/enrollment/find-enrollment-with-details.use-case';

import { CreateEnrollmentDto } from "src/university/dto/enrollment/create-enrollment.dto";
import { UpdateEnrollmentDto } from "src/university/dto/enrollment/update-enrollment.dto";
import { EnrollmentStatus } from "src/university/domain/enums/enrollment-status.enum";

@Controller('university/enroll')
@UseGuards(AuthGuard)
export class EnrollmentController {
    constructor(
        private readonly enrollInSubjectUseCase: EnrollInSubjectUseCase,
        private readonly updateEnrollmentUseCase: UpdateEnrollmentUseCase,
        private readonly deleteUseCase: DeleteEnrollmentUseCase,
        private readonly findAllUseCase: FindAllEnrollmentsUseCase,
        private readonly findAllDetailsUseCase: FindAllEnrollmentsWithDetailsUseCase,
        private readonly findByIdUseCase: FindEnrollmentByIdUseCase,
        private readonly findByStatusUseCase: FindEnrollmentByStatusUseCase,
        private readonly findByYearUseCase: FindEnrollmentByYearUseCase,
        private readonly findBySubjectUseCase: FindEnrollmentBySubjectUseCase,
    ) { }


    @Post()
    async enroll(@Body() dto: CreateEnrollmentDto, @GetUser('id') userId: string) {
        return await this.enrollInSubjectUseCase.execute(dto, userId);
    }

    @Get()
    async findAll(@GetUser('id') userId: string) {
        return await this.findAllUseCase.execute(userId);
    }

    @Get('details')
    async getDetails(@GetUser('id') userId: string) {
        return await this.findAllDetailsUseCase.execute(userId);
    }

    @Get('search/status')
    async findByStatus(
        @Query('status') status: EnrollmentStatus,
        @GetUser('id') userId: string
    ) {
        return await this.findByStatusUseCase.execute(status, userId);
    }

    @Get('search/year')
    async findByYear(
        @Query('year', ParseIntPipe) year: number,
        @GetUser('id') userId: string
    ) {
        return await this.findByYearUseCase.execute(year, userId);
    }

    @Get('subject/:subjectId')
    async findBySubject(
        @Param('subjectId', ParseUUIDPipe) subjectId: string,
        @GetUser('id') userId: string
    ) {
        return await this.findBySubjectUseCase.execute(subjectId, userId);
    }

    @Get(':id')
    async findOne(
        @Param('id', ParseUUIDPipe) id: string,
        @GetUser('id') userId: string
    ) {
        return await this.findByIdUseCase.execute(id, userId);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateEnrollmentDto,
        @GetUser('id') userId: string
    ) {
        return await this.updateEnrollmentUseCase.execute(id, userId, dto);
    }

    @Delete(':id')
    async remove(
        @Param('id', ParseUUIDPipe) id: string,
        @GetUser('id') userId: string
    ) {
        return await this.deleteUseCase.execute(id, userId);
    }
}