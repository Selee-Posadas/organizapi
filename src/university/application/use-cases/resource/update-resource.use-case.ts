import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Resource } from "src/university/domain/entities/resource.entity";
import type { EnrollmentRepository } from "src/university/domain/repositories/enrollment.repository";
import type { ResourceRepository } from "src/university/domain/repositories/resource.repository";
import { UpdateResourceDto } from "src/university/dto/resource/update-resource.dto";

@Injectable()
export class UpdateResourceUseCase {
    constructor(
        @Inject('ResourceRepository')
        private readonly repo: ResourceRepository
    ) { }

    async execute(id: string, userId: string, dto: UpdateResourceDto): Promise<Resource> {
        if (!dto) {
            throw new BadRequestException('Resource data is required');
        }
        if (!id) {
            throw new BadRequestException('Resource ID is required');
        }
        if (!userId) {
            throw new BadRequestException('User authentication is required');
        }
        const resource = await this.repo.findResourceById(id, userId);
        if (!resource) throw new NotFoundException('Resource not found');

        return await this.repo.updateResource(id, userId, dto);
    }
}