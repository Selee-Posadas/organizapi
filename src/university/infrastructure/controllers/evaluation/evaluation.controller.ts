import { Body, Controller, Post, Patch, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/infrastructure/guards/auth.guard";
import { GetUser } from "src/auth/infrastructure/decorators/get-user.decorator";
import { CreateEvaluationUseCase } from "src/university/application/use-cases/create-evaluation.use-case";
import { UpdateEvaluationUseCase } from "src/university/application/use-cases/update-evaluation.use-case";
import { CreateEvaluationDto } from "src/university/dto/create-evaluation.dto";
import { UpdateEvaluationDto } from "src/university/dto/update-evaluation.dto";

@Controller('evaluation')
@UseGuards(AuthGuard)
export class EvaluationController {
    constructor(
        private readonly createEvaluationUseCase: CreateEvaluationUseCase,
        private readonly updateEvaluationUseCase: UpdateEvaluationUseCase
    ) { }

    @Post('')
    async create(@Body() dto: CreateEvaluationDto, @GetUser('id') userId: string) {
        return await this.createEvaluationUseCase.execute(dto, userId);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateEvaluationDto,
        @GetUser('id') userId: string
    ) {
        return await this.updateEvaluationUseCase.execute(id, userId, dto);
    }
}