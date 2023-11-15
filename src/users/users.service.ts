import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDto } from './dtos/create-users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('Users') private readonly usersModel: Model<UsersDto>,
    ) {}

    async hashPassword(password: string): Promise<string> {

        const salt = process.env.SALT

        const passwordToBeHashed = password

        const hash = await bcrypt.hash(passwordToBeHashed, salt);

        return hash
    }

    async checkIfUserExists(username:string): Promise<UsersDto>{
        const findUser = await this.usersModel
                    .findOne({ 
                        username: { $regex: new RegExp(username, 'i') } 
                    })
                    .exec()

        return findUser  
    }

    async registerUser(createUserDto: UsersDto): Promise<Object> {

        const userSearch = await this.checkIfUserExists(createUserDto.username)

        if (userSearch === null) {

            const hashedPassword = await this.hashPassword(createUserDto.password)

            createUserDto.password = hashedPassword

            const user = await new this.usersModel(createUserDto).save();

            return { 
                id: user.id, 
                message: `User ${user.username} created successfully.`
            }
        }

        if (userSearch.username === createUserDto.username) {
            throw new  ConflictException('This user already exists.')
        }
    }

    async login(UserLoginDto: UsersDto) {
        // TODO: check if user and password alredy exist, then return true

    }

    async listAllUsers() {
        const allQuotes = await this.usersModel
                                    .find()
                                    .exec()
        return allQuotes      
    }

    async deleteUser(id: string): Promise<boolean> {
        const user = await this.usersModel.deleteOne({ _id: id }).exec();

        if (user.deletedCount === 0){
            throw new NotFoundException(`Quote id ${id} not found.`)
        }

        return user.acknowledged
    }
}
