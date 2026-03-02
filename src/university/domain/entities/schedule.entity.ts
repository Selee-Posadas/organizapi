export class Schedule {
  constructor(
    public readonly id: string,
    public readonly enrollmentId: string,
    public readonly dayOfWeek: number,
    public readonly startTime: string,
    public readonly endTime: string,
    public readonly type: string,
    public readonly location: string | null
  ) {}
}