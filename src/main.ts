import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe()
  );

  const config = new DocumentBuilder()
  .setTitle('Stoic Quotes API')
  .setDescription('Toy api to understand NestJS.')
  .setVersion('1.0')
  .addTag('stoics')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  app.enableCors();

  await app.listen(3000)
}

bootstrap();
