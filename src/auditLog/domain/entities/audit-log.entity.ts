export class AuditLog {
  constructor(
    public readonly id: string,
    public readonly action: string,
    public readonly userId: string,
    public readonly resourceId: string,
    public readonly details: string,
    public readonly createdAt: Date,
  ) {}
}