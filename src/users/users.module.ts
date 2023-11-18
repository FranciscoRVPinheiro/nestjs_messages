import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './users.model';
import { QuotesSchema } from 'src/quotes/quotes.model';
import { Guard } from 'src/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Users', schema: UsersSchema },
      { name: 'Quotes', schema: QuotesSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, Guard, JwtService],
})
export class UsersModule {}
