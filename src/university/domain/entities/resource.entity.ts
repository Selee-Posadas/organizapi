import { ResourceType } from "../enums/resouce-type.enum";

export class Resource {
  constructor(
    public readonly id: string,
    public readonly enrollmentId: string,
    public readonly name: string,
    public readonly type: ResourceType,
    public readonly url: string | null = null,
    public readonly isRead: boolean = false
  ) {
    if (!name || name.length < 2) throw new Error('Resource name is too short');
  }
}