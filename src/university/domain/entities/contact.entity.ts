import { ContactRule } from "../enums/contact-role.enum";

export class Contact {
  constructor(
    public readonly id: string,
    public readonly enrollmentId: string,
    public readonly name: string,
    public readonly role: ContactRule,
    public readonly email?: string | null,
    public readonly phone?: string | null,
    public readonly whatsappLink?: string | null,
    public readonly notes?: string | null,
  ) {}
}