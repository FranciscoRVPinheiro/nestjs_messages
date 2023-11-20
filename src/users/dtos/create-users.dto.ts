import { IsString, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UsersDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Length(3, 20)
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Length(6, 30)
  password: string;

  isAdmin: boolean;

  likedQuotes: string[];
  // TODO: add checks for size of strings and regex validation rules
}
