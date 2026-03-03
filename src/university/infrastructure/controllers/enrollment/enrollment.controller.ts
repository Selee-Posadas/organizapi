import { Body, Controller, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/infrastructure/guards/auth.guard";
import { GetUser } from "src/auth/infrastructure/decorators/get-user.decorator";
import { EnrollInSubjectUseCase } from "src/university/application/use-cases/enroll-in-subject.use-case";
import { CreateEnrollmentDto } from "src/university/dto/create-enrollment.dto";
import { UpdateEnrollmentDto } from "src/university/dto/update-enrollment.dto";
import { UpdateEnrollmentUseCase } from '../../../application/use-cases/update-enrollment.use-case';

@Controller('enroll')
@UseGuards(AuthGuard)
export class EnrollmentController {
    constructor(
        private readonly enrollInSubjectUseCase: EnrollInSubjectUseCase,
        private readonly updateEnrollmentUseCase: UpdateEnrollmentUseCase,
    ) { }

    @Post('')
    async enroll(@Body() dto: CreateEnrollmentDto, @GetUser('id') userId: string) {
        return await this.enrollInSubjectUseCase.execute(dto, userId);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateEnrollmentDto,
        @GetUser('id') userId: string
    ) {
        return await this.updateEnrollmentUseCase.execute(id, userId, dto);
    }
}