import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { CreateContactUseCase } from './application/use-cases/contact/create-contact.use-case';
import { UpdateContactUseCase } from './application/use-cases/contact/update-contact.use-case';
import { DeleteContactUseCase } from './application/use-cases/contact/delete-contact.use-case';
import { FindAllContactsUseCase } from './application/use-cases/contact/find-all-contacts.use-case';
import { FindAllContactsWithDetailsUseCase } from './application/use-cases/contact/find-all-contacts-detail.use-case';
import { FindContactByIdUseCase } from './application/use-cases/contact/find-contact-by-id.use-case';
import { FindContactsByNameUseCase } from './application/use-cases/contact/find-contacts-by-name.use-case';
import { FindContactsByRoleUseCase } from './application/use-cases/contact/find-contacts-by-role.use-case';
import { FindContactsByInstitutionUseCase } from './application/use-cases/contact/find-contacts-by-institution.use-case';
import { FindContactsByEnrollmentUseCase } from './application/use-cases/contact/find-contact-by-enroll.use-case';
import { FindContactsBySubjectUseCase } from './application/use-cases/contact/find-contacts-by-subject.use-case';
import { FindContactsByCareerUseCase } from './application/use-cases/contact/find-contacts-by-career.use-case';
import { ContactController } from './infrastructure/controllers/contact/contact.controller';
import { PrismaContactRepository } from './infrastructure/repositories/prisma-contact.repository';
import { PrismaEnrollmentRepository } from './infrastructure/repositories/prisma-enrollment.repository';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

const ContactUseCases = [
  CreateContactUseCase,
  UpdateContactUseCase,
  DeleteContactUseCase,
  FindAllContactsUseCase,
  FindAllContactsWithDetailsUseCase,
  FindContactByIdUseCase,
  FindContactsByNameUseCase,
  FindContactsByRoleUseCase,
  FindContactsByInstitutionUseCase,
  FindContactsByEnrollmentUseCase,
  FindContactsBySubjectUseCase,
  FindContactsByCareerUseCase,
];

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [ContactController],
  providers: [
    PrismaService,
    {
      provide: 'ContactRepository',
      useClass: PrismaContactRepository,
    },
    {
      provide: 'EnrollmentRepository',
      useClass: PrismaEnrollmentRepository,
    },
    ...ContactUseCases,
  ],
  exports: [...ContactUseCases],
})
export class ContactModule {}
