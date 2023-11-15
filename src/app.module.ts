import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { QuotesModule } from './quotes/quotes.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [UsersModule, QuotesModule, AuthModule]
})

export class AppModule {}