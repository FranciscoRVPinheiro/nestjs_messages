import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDto } from './dtos/create-users.dto';
import * as bcrypt from 'bcrypt';
import { CreateQuoteDto } from 'src/quotes/dtos/create-quote.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('Users') private readonly usersModel: Model<UsersDto>,
        @InjectModel('Quotes') private readonly quoteModel: Model<CreateQuoteDto>
    ) {}

    async hashPassword(password: string){

        const salt = process.env.SALT

        const passwordToBeHashed = password

        const hash = await bcrypt.hash(passwordToBeHashed, salt);

        return hash
    }

    async checkIfUserExists(username:string){
        const findUser = await this.usersModel
                    .findOne({ 
                        username: { $regex: new RegExp(username, 'i') } 
                    })
                    .exec()

        return findUser  
    }

    async listAllUsers() {
        const allQuotes = await this.usersModel.find().exec()                
        return allQuotes   
    }

    async registerUser(createUserDto: UsersDto){

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

    async deleteUser(id: string){
        const user = await this.usersModel.deleteOne({ _id: id }).exec();

        if (user.deletedCount === 0){
            throw new NotFoundException(`Quote id ${id} not found.`)
        }

        return user.acknowledged
    }

    async likeQuote(username: string, quoteId: string){
        const user = await this.usersModel.findOne({ username }).exec();

        if (!user) {
          throw new NotFoundException('User not found.');
        }
    
        if (!user.likedQuotes.includes(quoteId)) {

          user.likedQuotes.push(quoteId)

          return user.save()
        }
        return user;
      }

    async removeLikedQuote(username: string, quoteId: string){
        return await this.usersModel.findOneAndUpdate(
            { username: username },
            { $pull: { likedQuotes: quoteId } },
            { new: true },
          ).exec();
    }

    async listLikedQuotes(username: string) {
        
        const user = await this.usersModel.findOne({ username }).exec();

        if (!user) {
            return [];
          }

        const quotesArray = []

        for (const quoteId of user.likedQuotes) {
            const quote = await this.quoteModel.findById(quoteId).exec();
            
            if (quote) {
                quotesArray.push(
                    { 
                       author: quote.author,
                       quote: quote.quote
                    }
                );
            }
        }
        return quotesArray
    }     

}
