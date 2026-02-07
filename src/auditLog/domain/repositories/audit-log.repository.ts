import { AuditLog } from '../entities/audit-log.entity';

export interface AuditLogRepository {
  create(log: Partial<AuditLog>): Promise<void>;
  findAllByUserId(userId: string): Promise<AuditLog[]>;
}