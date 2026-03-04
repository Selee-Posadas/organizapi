import { BadRequestException, Inject, NotFoundException } from "@nestjs/common";
import { Career } from "src/university/domain/entities/career.entity";
import type { CareerRepository } from "src/university/domain/repositories/career.repository";

export class DeleteCareerUseCase {
    constructor(
        @Inject('CareerRepository')
        private readonly careerRepository: CareerRepository
    ) { }
    async execute(id: string, userId: string): Promise<void> {
        if (!id) {
            throw new BadRequestException('Career ID is required');
        }
        if (!userId) {
            throw new BadRequestException('User authentication is required');
        }

        const deleteCareer = await this.careerRepository.findCareerById(id, userId);

        if (!deleteCareer) {
            throw new NotFoundException('Career not found or access denied');
        }

        await this.careerRepository.deleteCareer(id, userId);
    }
}