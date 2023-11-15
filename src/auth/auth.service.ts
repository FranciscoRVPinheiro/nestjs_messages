import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDto } from './dtos/auth.dto'

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('Auth') private readonly authModel: Model<AuthDto>,
    ) {}

    async signin(doc: AuthDto) {
        const user = await new this.authModel(doc).save();
        return { 
            id: user.id, 
            username: user.username
        }
    }
}
