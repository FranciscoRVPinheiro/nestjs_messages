import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { QuotesModule } from './quotes/quotes.module';

async function bootstrap() {
  const app = await NestFactory.create(QuotesModule);
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
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
