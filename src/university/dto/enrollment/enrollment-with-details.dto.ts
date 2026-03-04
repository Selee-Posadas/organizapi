import { EnrollmentStatus } from 'src/university/domain/enums/enrollment-status.enum';

export class EnrollmentWithDetailsDto {
    id: string;
    subjectName: string;
    careerName: string;
    status: EnrollmentStatus;
    academicYear: number;
    finalGrade?: number | null;
}