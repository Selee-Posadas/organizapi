import { User as PrismaUser } from '../../../infrastructure/prisma/client';
import { User } from '../../domain/entities/user.entity';

export class UserMapper {

  static toDomain(raw: PrismaUser): User {
    return new User(
      raw.id,
      raw.email,
      raw.password_hash, 
      raw.name || '',
      raw.createdAt,
      raw.updatedAt,
    );
  }


  static toPersistence(user: User) {
    return {
      id: user.id,
      email: user.email,
      password_hash: user.passwordHash,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}