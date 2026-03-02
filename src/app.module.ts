import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { CategoryModule } from './category/category.module';
import { UniversityModule } from './university/university.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    TaskModule,
    CategoryModule,
    UniversityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
