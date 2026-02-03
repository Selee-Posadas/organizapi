import { User as PrismaUser } from '../../../infrastructure/prisma/client';
import { User } from '../../domain/entities/user.entity';

export class UserMapper {

  static toDomain(raw: PrismaUser): User {
    return new User(
      raw.id,
      raw.name || '',
      raw.email,
      raw.password_hash, 
      raw.createdAt,
      raw.updatedAt,
      raw.avatarId || 'avatar_1',
    );
  }


  static toPersistence(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password_hash: user.passwordHash,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      avatarId: user.avatarId,
    };
  }

  static toPersistencePartial(data: Partial<User>) {
  const persistenceData: any = {};

  if (data.name) persistenceData.name = data.name;
  if (data.email) persistenceData.email = data.email;
  if (data.avatarId) persistenceData.avatarId = data.avatarId;
  if (data.passwordHash) persistenceData.password_hash = data.passwordHash;

  return persistenceData;
}
}