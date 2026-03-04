import { StudyType } from "../enums/study-type.enum";

export class Career {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly userId: string,
    public readonly institution? : string | null,
    public readonly type: StudyType = StudyType.CAREER,
    public readonly whatsappGroup?: string | null,
    public readonly facultyContactInfo?: string | null,
  ) {
    if (!name || name.length < 3) throw new Error('Invalid career name');
  }
}