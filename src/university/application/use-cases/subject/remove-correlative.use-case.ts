import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { SubjectRepository } from 'src/university/domain/repositories/subject.repository';
import { Subject } from 'src/university/domain/entities/subject.entity';

@Injectable()
export class RemoveCorrelativeUseCase {
  constructor(
    @Inject('SubjectRepository')
    private readonly subjectRepository: SubjectRepository,
  ) {}

  async execute(
    subjectId: string,
    requiredId: string,
    userId: string,
  ): Promise<void> {
    if (!subjectId || !requiredId) {
      throw new BadRequestException('Subject ID is required');
    }
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }

    const subject = await this.subjectRepository.findSubjectById(
      subjectId,
      userId,
    );
    if (!subject) throw new NotFoundException('Subject not found');

    await this.subjectRepository.removeCorrelative(
      subjectId,
      requiredId,
      userId,
    );
  }
}
