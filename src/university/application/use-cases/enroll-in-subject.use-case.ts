
import { Enrollment } from 'src/university/domain/entities/enrollment.entity';
import { EnrollmentRepository } from '../../domain/repositories/enrollment.repository';
import { SubjectRepository } from 'src/university/domain/repositories/subject.repository';
import { CreateEnrollmentDto } from 'src/university/dto/create-enrollment.dto';
export class EnrollInSubjectUseCase {
    constructor (
        private readonly enrollRepository: EnrollmentRepository,
        private readonly subjectRepository: SubjectRepository
    ){}

    async execute(dto:CreateEnrollmentDto, userId: string): Promise<Enrollment>{
        
        const subject = await this.subjectRepository.findSubjectById(dto.subjectId, userId);

        if(!subject){
            throw new Error('The subject does not exist or you do not have access');
        }
        const existingEnrollment = await this.enrollRepository.findEnrollmentByUserAndSubject(userId, dto.subjectId);
        if(existingEnrollment){
            throw new Error('You are alredy enrolled to this subject');
        }

        return await this.enrollRepository.enrollUserInSubject({
            userId,
            ...dto
        });
    }
}