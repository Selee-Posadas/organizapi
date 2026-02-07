import { AuditLogRepository } from "../../domain/repositories/audit-log.repository";
import { AuditLog } from "../../domain/entities/audit-log.entity";

export class CreateAuditLogUseCase {
  constructor(private readonly auditRepository: AuditLogRepository) {}

  async execute(data: { 
    action: string; 
    userId: string; 
    resourceId?: string; 
    details?: string 
  }): Promise<void> {
    
    
    await this.auditRepository.create({
      action: data.action,
      userId: data.userId,
      resourceId: data.resourceId,
      details: data.details,
    });
  }
}