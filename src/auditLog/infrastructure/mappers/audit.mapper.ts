import { AuditLog } from "../../domain/entities/audit-log.entity";

export class AuditMapper {
  static toDomain(raw: any): AuditLog {
    return new AuditLog(
      raw.id,
      raw.action,
      raw.userId,
      raw.resourceId,
      raw.details,
      raw.createdAt
    );
  }

  static toPersistence(log: Partial<AuditLog>) {
    return {
      action: log.action,
      userId: log.userId,
      resourceId: log.resourceId,
      details: log.details,
    };
  }
}