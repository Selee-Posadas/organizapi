import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type {
  CorrelativeResult,
  SubjectRepository,
} from 'src/university/domain/repositories/subject.repository';
import { Subject } from 'src/university/domain/entities/subject.entity';

@Injectable()
export class GetCorrelativesUseCase {
  constructor(
    @Inject('SubjectRepository')
    private readonly subjectRepository: SubjectRepository,
  ) {}

  async execute(
    subjectId: string,
    userId: string,
  ): Promise<CorrelativeResult[]> {
    if (!subjectId) {
      throw new BadRequestException('Subject ID is required');
    }
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }

    return await this.subjectRepository.getCorrelatives(subjectId, userId);
  }
}
