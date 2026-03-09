import { Injectable, Inject } from '@nestjs/common';
import type { AuthTokenService } from 'src/auth/domain/ports/auth-token-service.interface';
import type { HashService } from 'src/auth/domain/ports/hash-service.interface';
import { LoginResponse } from 'src/auth/domain/ports/login-response.interface';
import type { UserRepository } from 'src/auth/domain/repositories/user.repository';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    @Inject('HashService')
    private readonly hashService: HashService,
    @Inject('AuthTokenService')
    private readonly tokenService: AuthTokenService,
  ) {}
  async execute(dto: LoginUserDto): Promise<LoginResponse> {
    const user = await this.userRepository.findByEmail(dto.email);

    // El dummy hash previene ataques de timing
    const dummyHash =
      '$2b$10$Dbv7JkR9vP/A1N5vX8u.ceO2G8Y6Z5G8Y6Z5G8Y6Z5G8Y6Z5G8Y6Z';

    const passwordHashToCompare = user ? user.passwordHash : dummyHash;

    const isPasswordValid = await this.hashService.compare(
      dto.password,
      passwordHashToCompare,
    );

    if (!user || !isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = await this.tokenService.generateToken({
      id: user.id,
      email: user.email,
    });

    return {
      user,
      accessToken: token,
    };
  }
}
