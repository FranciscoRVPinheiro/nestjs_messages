import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { QuotesModule } from './quotes/quotes.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        UsersModule, 
        QuotesModule, 
        AuthModule,
        ConfigModule.forRoot({
            isGlobal: true
          }),
        MongooseModule.forRoot(process.env.MONGO)
    ]
})

export class AppModule {}