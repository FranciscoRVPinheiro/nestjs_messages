import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dtos/create-users.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Post()
    async createUser(@Body() usersDto: UsersDto) {
        const user = await this.usersService.registerUser(usersDto)
        return user
    }

    @Get()
    async getUsers() {
        const users = await this.usersService.listAllUsers()
        return users
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: string){
        const user = await this.usersService.deleteUser(id)

        if (user) {
        return {
            message: `User id ${id} deleted successfully.`
          }
        }
    }
}
