import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;


    return UserMapper.toDomain(user);
  }

  async create(user: User): Promise<User> {
    const data = UserMapper.toPersistence(user);
    
    const createdUser = await this.prisma.user.create({
      data,
    });

    return UserMapper.toDomain(createdUser);
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const persistenceData = UserMapper.toPersistencePartial(data);
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: persistenceData,
    });

    return UserMapper.toDomain(updatedUser);
  }

}