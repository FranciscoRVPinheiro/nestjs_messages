import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post()
    async getAuth(@Body() authDto: AuthDto) {
        const auth = await this.authService.signin(authDto)
        return auth
    }
}
