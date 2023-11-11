import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { QuotesModule } from './quotes/quotes.module';

async function bootstrap() {
  const app = await NestFactory.create(QuotesModule);
  app.useGlobalPipes(
    new ValidationPipe()
  );
  await app.listen(3000);
}
bootstrap();
