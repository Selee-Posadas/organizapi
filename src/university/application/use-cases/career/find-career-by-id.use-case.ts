import { BadRequestException, Inject } from "@nestjs/common";
import { Career } from "src/university/domain/entities/career.entity";
import type { CareerRepository } from "src/university/domain/repositories/career.repository";

export class FindCareerByIdUseCase {
    constructor(
        @Inject('CareerRepository')
        private readonly careerRepository: CareerRepository
    ) { }
    async execute(id: string, userId: string): Promise<Career | null> {
        if (!id) {
            throw new BadRequestException('Career ID is required');
        }
        if (!userId) {
            throw new BadRequestException('User authentication is required');
        }
        return await this.careerRepository.findCareerById(id, userId);
    }
}