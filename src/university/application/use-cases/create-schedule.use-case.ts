import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { EnrollmentRepository } from "../../domain/repositories/enrollment.repository";
import { ScheduleRepository } from "../../domain/repositories/schedule.repository";
import { CreateScheduleDto } from "../../dto/create-schedule.dto";

export class CreateScheduleUseCase {
    constructor(
        private readonly scheduleRepo: ScheduleRepository,
        private readonly enrollmentRepo: EnrollmentRepository
    ) { }

    async execute(dto: CreateScheduleDto, userId: string) {
       
        const enrollment = await this.enrollmentRepo.findEnrollmentById(dto.enrollmentId, userId);
        
        if (!enrollment) {
            throw new NotFoundException('Enrollment not found or access denied');
        }

       
        return await this.scheduleRepo.createSchedule({
            ...dto
        }, 
        userId
    );
    }
}