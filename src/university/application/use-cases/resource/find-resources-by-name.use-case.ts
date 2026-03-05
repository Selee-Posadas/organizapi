import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { Resource } from "src/university/domain/entities/resource.entity";
import { ResourceType } from "src/university/domain/enums/resouce-type.enum";
import type { ResourceRepository } from "src/university/domain/repositories/resource.repository";


@Injectable()
export class FindResourcesByNameUseCase {
    constructor(
        @Inject('ResourceRepository') 
        private readonly repo: ResourceRepository
    ) { }

    async execute(name: string, userId: string): Promise<Resource[]> {
        if (!name) {
            throw new BadRequestException('Resource name is required');
        }
        if (!userId) {
            throw new BadRequestException('User authentication is required');
        }
        
        return await this.repo.findResourcesByName(name, userId);
    }
}