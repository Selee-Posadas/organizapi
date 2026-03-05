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
    ParseUUIDPipe
} from "@nestjs/common";
import { AuthGuard } from "src/auth/infrastructure/guards/auth.guard";
import { GetUser } from "src/auth/infrastructure/decorators/get-user.decorator";

import { CreateResourceDto } from "src/university/dto/resource/create-resource.dto";
import { UpdateResourceDto } from "src/university/dto/resource/update-resource.dto";

import { CreateResourceUseCase } from "src/university/application/use-cases/resource/create-resource.use-case";
import { UpdateResourceUseCase } from "src/university/application/use-cases/resource/update-resource.use-case";
import { DeleteResourceUseCase } from "src/university/application/use-cases/resource/delete-resource.use-case";
import { FindResourceByIdUseCase } from "src/university/application/use-cases/resource/find-resource-by-id.use-case";
import { FindResourcesByEnrollmentUseCase } from "src/university/application/use-cases/resource/find-resources-by-enrollment.use-case";
import { FindResourcesByNameUseCase } from "src/university/application/use-cases/resource/find-resources-by-name.use-case";
import { FindResourcesByTypeUseCase } from "src/university/application/use-cases/resource/find-resources-by-type.use-case";
import { FindResourcesWithDetailsUseCase } from "src/university/application/use-cases/resource/find-resources-with-details.use-case";
import { ToggleReadStatusUseCase } from "src/university/application/use-cases/resource/toggle-read-status.use-case";
import { ResourceType } from "src/university/domain/enums/resouce-type.enum";

@Controller('university/resource')
@UseGuards(AuthGuard)
export class ResourceController {
    constructor(
        private readonly createUseCase: CreateResourceUseCase,
        private readonly updateUseCase: UpdateResourceUseCase,
        private readonly deleteUseCase: DeleteResourceUseCase,
        private readonly findByIdUseCase: FindResourceByIdUseCase,
        private readonly findByEnrollmentUseCase: FindResourcesByEnrollmentUseCase,
        private readonly findByNameUseCase: FindResourcesByNameUseCase,
        private readonly findByTypeUseCase: FindResourcesByTypeUseCase,
        private readonly findWithDetailsUseCase: FindResourcesWithDetailsUseCase,
        private readonly toggleReadUseCase: ToggleReadStatusUseCase,
    ) { }

    @Post()
    async create(@Body() dto: CreateResourceDto, @GetUser('id') userId: string) {
        return await this.createUseCase.execute(dto, userId);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateResourceDto,
        @GetUser('id') userId: string
    ) {
        return await this.updateUseCase.execute(id, userId, dto);
    }

    @Patch(':id/toggle-read')
    async toggleRead(
        @Param('id', ParseUUIDPipe) id: string,
        @Body('isRead') isRead: boolean,
        @GetUser('id') userId: string
    ) {
        return await this.toggleReadUseCase.execute(id, userId, isRead);
    }

    @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id: string, @GetUser('id') userId: string) {
        return await this.deleteUseCase.execute(id, userId);
    }

    @Get('enrollment/:enrollmentId')
    async findByEnrollment(
        @Param('enrollmentId', ParseUUIDPipe) enrollmentId: string,
        @GetUser('id') userId: string
    ) {
        return await this.findByEnrollmentUseCase.execute(enrollmentId, userId);
    }

    @Get('enrollment/:enrollmentId/details')
    async findWithDetails(
        @Param('enrollmentId', ParseUUIDPipe) enrollmentId: string,
        @GetUser('id') userId: string
    ) {
        return await this.findWithDetailsUseCase.execute(enrollmentId, userId);
    }


    @Get('search/name')
    async findByName(@Query('name') name: string, @GetUser('id') userId: string) {
        return await this.findByNameUseCase.execute(name, userId);
    }

    @Get('search/type')
    async findByType(@Query('type') type: ResourceType, @GetUser('id') userId: string) {
        return await this.findByTypeUseCase.execute(type, userId);
    }

    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string, @GetUser('id') userId: string) {
        return await this.findByIdUseCase.execute(id, userId);
    }
}