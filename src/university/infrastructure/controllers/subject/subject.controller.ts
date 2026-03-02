import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { GetUser } from "src/auth/infrastructure/decorators/get-user.decorator";
import { AuthGuard } from "src/auth/infrastructure/guards/auth.guard";
import { AddSubjectUseCase } from "src/university/application/use-cases/add-subject.use-case";
import { CreateSubjectDto } from "src/university/dto/create-subject.dto";

@Controller('subject')
@UseGuards(AuthGuard)
export class SubjectController {
    constructor(
        private readonly addSubjectUseCase: AddSubjectUseCase,
    ) { }

    @Post('')
    async addSubject(@Body() dto: CreateSubjectDto, @GetUser('id') userId: string) {
        return await this.addSubjectUseCase.execute(dto, userId);
    }

}