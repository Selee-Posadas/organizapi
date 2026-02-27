import { Subject } from '../../domain/entities/subject.entity';
import { SubjectRepository } from '../../domain/repositories/subject.repository';
import { CareerRepository } from '../../domain/repositories/career.repository';
import { CreateSubjectDto } from '../../dto/create-subject.dto';

export class AddSubjectUseCase {
  constructor(
    private readonly subjectRepository: SubjectRepository,
    private readonly careerRepository: CareerRepository
  ) {}

  async execute(dto: CreateSubjectDto, userId: string): Promise<Subject> {
    const career = await this.careerRepository.findCareerById(dto.careerId, userId);
    
    if (!career) {
      throw new Error('The career especified does not exist or you do not have access'); 
    }

    const existingSubject = await this.subjectRepository.findSubjectByName(dto.name, userId);
    if (existingSubject && existingSubject.careerId === dto.careerId) {
       throw new Error('This subject is alredy at the plan');
    }

    return await this.subjectRepository.createSubject({
      careerId: dto.careerId,
      name: dto.name,
      yearLevel: dto.yearLevel,
      semester: dto.semester,
    });
  }
}