import { BadRequestException, Inject } from "@nestjs/common";
import { Career } from "src/university/domain/entities/career.entity";
import type { CareerRepository } from "src/university/domain/repositories/career.repository";

export class FindCareersByNameUseCase {
    constructor(
        @Inject('CareerRepository')
        private readonly careerRepository: CareerRepository
    ) { }
    async execute(careerName: string, userId: string): Promise<Career[]> {
        if (!careerName) {
            throw new BadRequestException('Career name is required');
        }
        if (!userId) {
            throw new BadRequestException('User authentication is required');
        }
        return await this.careerRepository.findCareersByName(careerName, userId);
    }
}