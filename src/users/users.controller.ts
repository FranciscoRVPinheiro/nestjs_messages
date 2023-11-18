import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dtos/create-users.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Guard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiTags('Users')
  async getUsers() {
    const users = await this.usersService.listAllUsers();
    return users;
  }

  @Post()
  @ApiTags('Users')
  async createUser(@Body() usersDto: UsersDto) {
    const user = await this.usersService.registerUser(usersDto);
    return user;
  }
  @UseGuards(Guard)
  @Delete('/:id')
  @ApiTags('Users')
  async deleteUser(@Param('id') id: string, @Request() req: any) {
    const user = await this.usersService.deleteUser(id, req);

    if (user) {
      return {
        message: `User id ${id} deleted successfully.`,
      };
    }
  }
  @UseGuards(Guard)
  @ApiTags('Likes')
  @Post('/:username/like/:quoteId')
  async likeQuote(
    @Param('username') username: string,
    @Param('quoteId') quoteId: string,
    @Request() req: any,
  ) {
    return await this.usersService.likeQuote(username, quoteId, req);
  }
  @UseGuards(Guard)
  @ApiTags('Likes')
  @Post('/:username/removelike/:quoteId')
  async removeLikedQuote(
    @Param('username') username: string,
    @Param('quoteId') quoteId: string,
    @Request() req: any,
  ) {
    return this.usersService.removeLikedQuote(username, quoteId, req);
  }

  @UseGuards(Guard)
  @ApiTags('Likes')
  @Get('/:username/likes')
  async listLikes(@Param('username') username: string, @Request() req: any) {
    return await this.usersService.listLikedQuotes(username, req);
  }
}
