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
   
    {
      provide: RegisterUserUseCase,
      useFactory: (userRepo: UserRepository, hashService: HashService) => {
        return new RegisterUserUseCase(userRepo, hashService);
      },
      inject: ['UserRepository', 'HashService'],
    },

    {
      provide: LoginUseCase,
      useFactory: (userRepo: UserRepository, hashService: HashService, tokenService: AuthTokenService) => {
        return new LoginUseCase(userRepo, hashService, tokenService);
      },
      inject: ['UserRepository', 'HashService', 'AuthTokenService'],
    },
    {
      provide: UpdateProfileUseCase,
      useFactory: (userRepo: UserRepository) => {
        return new UpdateProfileUseCase(userRepo);
      },
      inject: ['UserRepository'],
    },
    
    PrismaService,
  ], 
  imports: [
    JwtModule.registerAsync({
      useFactory: () => {
        const secret = process.env.JWT_SECRET;
        if (!secret || secret.length === 0) {
          throw new Error('FATAL: JWT_SECRET environment variable is not defined');
        }
        return {
          secret,
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
  ],
  exports: [RegisterUserUseCase, LoginUseCase, 'AuthTokenService', UpdateProfileUseCase],
})
export class AuthModule {}