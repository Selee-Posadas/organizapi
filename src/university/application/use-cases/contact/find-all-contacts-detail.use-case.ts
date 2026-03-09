import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import type { ContactRepository } from 'src/university/domain/repositories/contact.repository';
import type { ContactWithSubjectDto } from 'src/university/dto/contact/contact-with-subject.dto';

@Injectable()
export class FindAllContactsWithDetailsUseCase {
  constructor(
    @Inject('ContactRepository')
    private readonly contactRepo: ContactRepository,
  ) {}

  async execute(userId: string): Promise<ContactWithSubjectDto[]> {
    if (!userId) {
      throw new BadRequestException('User authentication is required');
    }
    return await this.contactRepo.findAllContactsWithDetails(userId);
  }
}
