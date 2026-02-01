import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { BcryptAdapter } from './infrastructure/adapters/bcrypt.adapter';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { RegisterUserUseCase } from './application/use-cases/register-user.use-case';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';


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
      useFactory: (userRepo: any, hashService: any) => {
        return new RegisterUserUseCase(userRepo, hashService);
      },
      inject: ['UserRepository', 'HashService'],
    },

    PrismaService,
  ],
  exports: [RegisterUserUseCase],
})
export class AuthModule {}