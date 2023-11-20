import { Module } from '@nestjs/common';
import { QuotesController } from './quotes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QuotesSchema } from './quotes.model';
import { QuotesService } from './quotes.service';
import { UsersSchema } from 'src/users/users.model';
import { Guard } from 'src/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Quotes', schema: QuotesSchema },
      { name: 'Users', schema: UsersSchema },
    ]),
  ],
  providers: [QuotesService, Guard, JwtService],
  controllers: [QuotesController],
})
export class QuotesModule {}
