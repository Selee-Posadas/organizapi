import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { SubjectRepository } from 'src/university/domain/repositories/subject.repository';
import { Subject } from 'src/university/domain/entities/subject.entity';
import { UpdateSubjectDto } from 'src/university/dto/subject/update-subject.dto';

@Injectable()
export class UpdateSubjectUseCase {
  constructor(
    @Inject('SubjectRepository')
    private readonly subjectRepository: SubjectRepository,
  ) {}

  async execute(
    id: string,
    userId: string,
    dto: UpdateSubjectDto,
  ): Promise<Subject> {
    if (!id) {
      throw new BadRequestException('Subject ID is required');
    }
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }
    if (!dto) {
      throw new BadRequestException('Subject data is required');
    }

    const subject = await this.subjectRepository.findSubjectById(id, userId);
    if (!subject) throw new NotFoundException('Subject not found');

    return await this.subjectRepository.updateSubject(id, userId, dto);
  }
}
