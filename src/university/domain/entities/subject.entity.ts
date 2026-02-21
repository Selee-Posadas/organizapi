export class Subject {
  constructor(
    public readonly id: string,
    public readonly careerId: string,
    public readonly name: string,
    public readonly yearLevel: number,
    public readonly semester: number,
  ) {
    if (yearLevel < 1) throw new Error('Year level must be positive');
    if (semester < 1 || semester > 2) throw new Error('Semester must be 1 or 2');
  }
}