import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from '../users/users.model';
import { AuthSchema } from './auth.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Users', schema: UsersSchema },
      { name: 'Auth', schema: AuthSchema } 
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
