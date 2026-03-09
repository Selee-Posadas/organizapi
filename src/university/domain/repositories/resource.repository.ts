import { ResourceWithDetailsDto } from 'src/university/dto/resource/resource-with-details.dto';
import { Resource } from '../entities/resource.entity';
import { ResourceType } from '../enums/resouce-type.enum';

export interface ResourceRepository {
  createResource(data: Partial<Resource>): Promise<Resource>;
  updateResource(
    id: string,
    userId: string,
    data: Partial<Resource>,
  ): Promise<Resource>;
  deleteResource(id: string, userId: string): Promise<void>;

  findResourceById(id: string, userId: string): Promise<Resource | null>;
  findResourcesByEnrollment(
    enrollmentId: string,
    userId: string,
  ): Promise<Resource[]>;
  findResourcesByName(name: string, userId: string): Promise<Resource[]>;
  findResourcesByType(type: ResourceType, userId: string): Promise<Resource[]>;

  toggleReadStatus(
    id: string,
    userId: string,
    isRead: boolean,
  ): Promise<Resource>;

  findResourcesWithDetails(
    enrollmentId: string,
    userId: string,
  ): Promise<ResourceWithDetailsDto[]>;
}
