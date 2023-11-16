import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto'
import { ApiTags } from '@nestjs/swagger';
import { UsersDto } from 'src/users/dtos/create-users.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post()
    async getAuth(@Body() authDto: AuthDto) {
        const userDto = {
            username: authDto.username,
            password: authDto.password,
            likedQuotes: authDto.likedQuotes,
          };
        const auth = await this.authService.signin(userDto)
        return auth
    }
}
