// find-subject-by-name.use-case.ts
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { SubjectRepository } from 'src/university/domain/repositories/subject.repository';
import { Subject } from 'src/university/domain/entities/subject.entity';

@Injectable()
export class FindSubjectByNameUseCase {
  constructor(
    @Inject('SubjectRepository')
    private readonly subjectRepository: SubjectRepository,
  ) {}

  async execute(name: string, userId: string): Promise<Subject | null> {
    if (!name) {
      throw new BadRequestException('Subject name is required');
    }
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }

    return await this.subjectRepository.findSubjectByName(name, userId);
  }
}
