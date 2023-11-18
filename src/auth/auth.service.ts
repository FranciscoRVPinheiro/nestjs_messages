import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDto } from './dtos/auth.dto';
import * as bcrypt from 'bcrypt';
import { UsersDto } from 'src/users/dtos/create-users.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Auth') private readonly authModel: Model<AuthDto>,
    @InjectModel('Users') private readonly usersModel: Model<UsersDto>,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string) {
    const salt = process.env.SALT;
    const passwordToBeHashed = password;

    const hash = await bcrypt.hash(passwordToBeHashed, salt);

    return hash;
  }

  async checkIfUserExists(username: string) {
    const findUser = await this.usersModel
      .findOne({
        username: { $regex: new RegExp(username, 'i') },
      })
      .exec();

    return findUser;
  }

  async signin(signinDto: AuthDto) {
    const hashedPassword = await this.hashPassword(signinDto.password);

    const userSearch = await this.checkIfUserExists(signinDto.username);

    if (userSearch) {
      if (
        userSearch.username === signinDto.username &&
        hashedPassword === userSearch.password
      ) {
        const payload = { username: userSearch.username, sub: userSearch._id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    }
    throw new UnauthorizedException('Username or password does not match.');
  }

  async signmOut() {
    // TODO
  }
}
