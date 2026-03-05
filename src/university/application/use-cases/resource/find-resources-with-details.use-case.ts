import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { ResourceRepository } from "src/university/domain/repositories/resource.repository";
import type { EnrollmentRepository } from "src/university/domain/repositories/enrollment.repository";
import { UniversityMapper } from "src/university/infrastructure/mappers/university.mapper";
import { ResourceWithDetailsDto } from "src/university/dto/resource/resource-with-details.dto";

@Injectable()
export class FindResourcesWithDetailsUseCase {
    constructor(
        @Inject('ResourceRepository') 
        private readonly resourceRepo: ResourceRepository,
        @Inject('EnrollmentRepository') 
        private readonly enrollmentRepo: EnrollmentRepository
    ) {}

    async execute(enrollmentId: string, userId: string): Promise<ResourceWithDetailsDto[]> {
   
        const enrollment = await this.enrollmentRepo.findEnrollmentById(enrollmentId, userId);
        if (!enrollment) throw new NotFoundException('Enrollment not found or unauthorized');

        return await this.resourceRepo.findResourcesWithDetails(enrollmentId, userId);
    }
}