export class Subject {
  constructor(
    public readonly id: string,
    public readonly careerId: string,
    public readonly name: string,
    public readonly yearLevel: number,
    public readonly semester: number,
    public readonly credits: number = 0,
  ) {
    if (yearLevel < 1) throw new Error('Year level must be positive');
    if (semester < 0 || semester > 2) throw new Error('Semester must be 0, 1 or 2');
    if (credits < 0) throw new Error('Credits cannot be negative');
  }
}