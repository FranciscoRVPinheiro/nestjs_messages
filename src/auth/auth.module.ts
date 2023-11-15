import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import  { AuthSchema } from './auth.model'
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGO),
    MongooseModule.forFeature([{
      name: 'Auth', schema: AuthSchema,
    }]),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
