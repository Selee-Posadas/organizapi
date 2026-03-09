import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { Resource } from 'src/university/domain/entities/resource.entity';
import { ResourceRepository } from 'src/university/domain/repositories/resource.repository';
import { UniversityMapper } from '../mappers/university.mapper';
import { ResourceType } from 'src/university/domain/enums/resouce-type.enum';
import { ResourceWithDetailsDto } from 'src/university/dto/resource/resource-with-details.dto';

@Injectable()
export class PrismaResourceRepository implements ResourceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createResource(data: Partial<Resource>): Promise<Resource> {
    const created = await this.prisma.resource.create({
      data: {
        enrollmentId: data.enrollmentId!,
        name: data.name!,
        type: data.type!,
        url: data.url,
        isRead: false,
      },
    });
    return UniversityMapper.toDomainResource(created);
  }

  async updateResource(
    id: string,
    userId: string,
    data: Partial<Resource>,
  ): Promise<Resource> {
    await this.prisma.resource.updateMany({
      where: {
        id,
        enrollment: { userId },
      },
      data: { ...data },
    });

    const updated = await this.findResourceById(id, userId);
    if (!updated) throw new Error('Resource not found or unauthorized');
    return updated;
  }

  async toggleReadStatus(
    id: string,
    userId: string,
    isRead: boolean,
  ): Promise<Resource> {
    return this.updateResource(id, userId, { isRead } as any);
  }

  async findResourceById(id: string, userId: string): Promise<Resource | null> {
    const res = await this.prisma.resource.findFirst({
      where: { id, enrollment: { userId } },
    });
    return res ? UniversityMapper.toDomainResource(res) : null;
  }

  async findResourcesByEnrollment(
    enrollmentId: string,
    userId: string,
  ): Promise<Resource[]> {
    const resources = await this.prisma.resource.findMany({
      where: { enrollmentId, enrollment: { userId } },
    });
    return resources.map(UniversityMapper.toDomainResource);
  }

  async findResourcesByName(name: string, userId: string): Promise<Resource[]> {
    const resources = await this.prisma.resource.findMany({
      where: {
        name: { contains: name, mode: 'insensitive' },
        enrollment: { userId },
      },
    });
    return resources.map(UniversityMapper.toDomainResource);
  }

  async findResourcesByType(
    type: ResourceType,
    userId: string,
  ): Promise<Resource[]> {
    const resources = await this.prisma.resource.findMany({
      where: { type, enrollment: { userId } },
    });
    return resources.map(UniversityMapper.toDomainResource);
  }

  async deleteResource(id: string, userId: string): Promise<void> {
    await this.prisma.resource.deleteMany({
      where: { id, enrollment: { userId } },
    });
  }

  async findResourcesWithDetails(
    enrollmentId: string,
    userId: string,
  ): Promise<ResourceWithDetailsDto[]> {
    const results = await this.prisma.resource.findMany({
      where: {
        enrollmentId,
        enrollment: { userId },
      },
      include: {
        enrollment: {
          include: { subject: true },
        },
      },
    });

    return results.map((res) => UniversityMapper.toResourceWithDetails(res));
  }
}
