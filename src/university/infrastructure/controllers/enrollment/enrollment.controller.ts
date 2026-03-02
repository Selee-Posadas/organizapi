import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/infrastructure/guards/auth.guard";
import { GetUser } from "src/auth/infrastructure/decorators/get-user.decorator";
import { EnrollInSubjectUseCase } from "src/university/application/use-cases/enroll-in-subject.use-case";
import { CreateEnrollmentDto } from "src/university/dto/create-enrollment.dto";

@Controller('enroll')
@UseGuards(AuthGuard)
export class EnrollmentController {
    constructor(
        private readonly enrollInSubjectUseCase: EnrollInSubjectUseCase
    ) { }

    @Post('')
    async enroll(@Body() dto: CreateEnrollmentDto, @GetUser('id') userId: string) {
        return await this.enrollInSubjectUseCase.execute(dto, userId);
    }
}