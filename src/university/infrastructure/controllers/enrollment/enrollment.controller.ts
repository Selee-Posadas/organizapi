import { Body, Controller, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/infrastructure/guards/auth.guard";
import { GetUser } from "src/auth/infrastructure/decorators/get-user.decorator";
import { EnrollInSubjectUseCase } from "src/university/application/use-cases/enrollment/enroll-in-subject.use-case";
import { UpdateEnrollmentUseCase } from "src/university/application/use-cases/enrollment/update-enrollment.use-case";
import { CreateEnrollmentDto } from "src/university/dto/enrollment/create-enrollment.dto";
import { UpdateEnrollmentDto } from "src/university/dto/enrollment/update-enrollment.dto";

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