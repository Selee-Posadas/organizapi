export class Career {
  constructor(
    public readonly id: string,
    public readonly name: string,
  ) {
    if (!name || name.length < 3) throw new Error('Invalid career name');
  }
}