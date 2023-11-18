import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { Guard } from './auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async getAuth(@Body() authDto: AuthDto) {
    const userDto = {
      username: authDto.username,
      password: authDto.password,
      likedQuotes: authDto.likedQuotes,
    };
    const auth = await this.authService.signin(userDto);
    return auth;
  }

  @UseGuards(Guard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
