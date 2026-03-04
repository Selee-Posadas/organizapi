import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/infrastructure/guards/auth.guard";
import { GetUser } from "src/auth/infrastructure/decorators/get-user.decorator";
import { CreateCareerUseCase } from "src/university/application/use-cases/career/create-career.use-case";
import { CreateCareerDto } from "src/university/dto/career/create-career.dto";

@Controller('career')
@UseGuards(AuthGuard)
export class CareerController {
    constructor(
        private readonly createCareerUseCase:CreateCareerUseCase
    ){}

    @Post('')
      async createCareer(@Body() dto: CreateCareerDto, @GetUser('id') userId: string) {
        return await this.createCareerUseCase.execute(dto, userId);
      }
}