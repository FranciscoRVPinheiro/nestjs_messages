import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { QuotesController } from './quotes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QuotesSchema } from './quotes.model';
import { QuotesService } from './quotes.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGO),
    MongooseModule.forFeature([{
      name: 'Quotes', schema: QuotesSchema,
    }]),
  ],
  providers: [QuotesService],
  controllers: [QuotesController]
})
export class QuotesModule {}
