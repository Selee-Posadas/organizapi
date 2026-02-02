import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { BcryptAdapter } from './infrastructure/adapters/bcrypt.adapter';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { RegisterUserUseCase } from './application/use-cases/register-user.use-case';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { UserRepository } from './domain/repositories/user.repository';
import { HashService } from './domain/ports/hash-service.interface';


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
      provide: RegisterUserUseCase,
      useFactory: (userRepo: UserRepository, hashService: HashService) => {
        return new RegisterUserUseCase(userRepo, hashService);
      },
      inject: ['UserRepository', 'HashService'],
    },

    {
      provide: LoginUseCase,
      useFactory: (userRepo: UserRepository, hashService: HashService) => {
        return new LoginUseCase(userRepo, hashService);
      },
      inject: ['UserRepository', 'HashService'],
    },


    PrismaService,
  ],
  exports: [RegisterUserUseCase, LoginUseCase],
})
export class AuthModule {}