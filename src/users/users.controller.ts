import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dtos/create-users.dto';
import { ApiTags } from '@nestjs/swagger';

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

  @Delete('/:id')
  @ApiTags('Users')
  async deleteUser(@Param('id') id: string) {
    const user = await this.usersService.deleteUser(id);

    if (user) {
      return {
        message: `User id ${id} deleted successfully.`,
      };
    }
  }

  @ApiTags('Likes')
  @Post('/:username/like/:quoteId')
  async likeQuote(
    @Param('username') username: string,
    @Param('quoteId') quoteId: string,
  ) {
    return await this.usersService.likeQuote(username, quoteId);
  }

  @ApiTags('Likes')
  @Post('/:username/removelike/:quoteId')
  async removeLikedQuote(
    @Param('username') username: string,
    @Param('quoteId') quoteId: string,
  ) {
    return this.usersService.removeLikedQuote(username, quoteId);
  }

  @ApiTags('Likes')
  @Get('/:username/likes')
  async listLikes(@Param('username') username: string) {
    return await this.usersService.listLikedQuotes(username);
  }
}
