import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { AuditLog } from "../../domain/entities/audit-log.entity";
import { AuditLogRepository } from "../../domain/repositories/audit-log.repository";
import { AuditMapper } from "../mappers/audit.mapper";

@Injectable()
export class PrismaAuditRepository implements AuditLogRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(log: Partial<AuditLog>): Promise<void> {
    const data = AuditMapper.toPersistence(log);

    await this.prisma.auditLog.create({
      data: {
        action: data.action!,
        userId: data.userId!,
        resourceId: data.resourceId,
        details: data.details,
      },
    });
  }

  async findAllByUserId(userId: string): Promise<AuditLog[]> {
    const logs = await this.prisma.auditLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return logs.map(AuditMapper.toDomain);
  }
}