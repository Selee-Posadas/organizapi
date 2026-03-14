import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './infrastructure/common/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Organizapi - API Documentation')
    .setDescription('Documentation for the Sele/s Planner Life API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Búnker listo en: http://localhost:${process.env.PORT ?? 3000}/api/docs`);

}
bootstrap();
