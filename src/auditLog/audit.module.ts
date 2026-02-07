import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { PrismaAuditRepository } from './infrastructure/repositories/prisma-audit.repository';
import { CreateAuditLogUseCase } from './application/use-cases/create-audit-log.use-case';
import { AuditLogRepository } from './domain/repositories/audit-log.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: 'AuditLogRepository',
      useClass: PrismaAuditRepository,
    },
    {
      provide: CreateAuditLogUseCase,
      useFactory: (repo: AuditLogRepository) => new CreateAuditLogUseCase(repo),
      inject: ['AuditLogRepository'],
    },
  ],
  exports: [CreateAuditLogUseCase],
})
export class AuditModule {}