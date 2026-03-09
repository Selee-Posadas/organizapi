export class ResourceWithDetailsDto {
  id: string;
  name: string;
  url: string | null;
  type: string;
  isRead: boolean;
  subjectName: string;
  enrollmentId: string;
}
