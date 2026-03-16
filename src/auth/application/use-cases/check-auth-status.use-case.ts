import { Injectable, Inject } from '@nestjs/common';
import { User } from 'src/auth/domain/entities/user.entity';
import type { AuthTokenService } from 'src/auth/domain/ports/auth-token-service.interface';
import type { UserRepository } from 'src/auth/domain/repositories/user.repository';

@Injectable()
export class CheckAuthStatusUseCase {
  constructor(
    @Inject('AuthTokenService')
    private readonly tokenService: AuthTokenService,
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(userId: string): Promise<{ user: User; accessToken: string }> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const payload = { id: user.id, email: user.email };
    const accessToken = await this.tokenService.generateToken(payload);

    return { user, accessToken };
  }
}
