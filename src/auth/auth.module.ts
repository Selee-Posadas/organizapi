import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { BcryptAdapter } from './infrastructure/adapters/bcrypt.adapter';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { RegisterUserUseCase } from './application/use-cases/register-user.use-case';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { UserRepository } from './domain/repositories/user.repository';
import { HashService } from './domain/ports/hash-service.interface';
import { JwtModule } from '@nestjs/jwt';
import { JwtAdapter } from './infrastructure/adapters/jwt.adapter';
import { AuthTokenService } from './domain/ports/auth-token-service.interface';
import { UpdateProfileUseCase } from './application/use-cases/update-profile.use-case';
import { CheckAuthStatusUseCase } from './application/use-cases/check-auth-status.use-case';

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: 'HashService',
      useClass: BcryptAdapter,
    },

    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository,
    },

    {
      provide: 'AuthTokenService',
      useClass: JwtAdapter,
    },

    RegisterUserUseCase,
    LoginUseCase,
    UpdateProfileUseCase,
    CheckAuthStatusUseCase,

    PrismaService,
  ],
  imports: [
    JwtModule.registerAsync({
      useFactory: () => {
        const secret = process.env.JWT_SECRET;
        if (!secret || secret.length === 0) {
          throw new Error(
            'FATAL: JWT_SECRET environment variable is not defined',
          );
        }
        return {
          secret,
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
  ],
  exports: [
    RegisterUserUseCase,
    LoginUseCase,
    'AuthTokenService',
    UpdateProfileUseCase,
    CheckAuthStatusUseCase,
  ],
})
export class AuthModule {}
