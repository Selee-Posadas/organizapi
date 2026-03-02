import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/infrastructure/guards/auth.guard";
import { CreateCareerUseCase } from '../../../application/use-cases/create-career.use-case';
import { GetUser } from "src/auth/infrastructure/decorators/get-user.decorator";
import { CreateCareerDto } from "src/university/dto/create-career.dto";

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