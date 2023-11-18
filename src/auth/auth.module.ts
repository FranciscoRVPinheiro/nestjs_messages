import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from '../users/users.model';
import { AuthSchema } from './auth.model';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Guard } from './auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '6000s' },
    }),
    MongooseModule.forFeature([
      { name: 'Users', schema: UsersSchema },
      { name: 'Auth', schema: AuthSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, Guard],
  exports: [AuthService, Guard],
})
export class AuthModule {}
