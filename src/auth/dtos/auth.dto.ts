import { IsString, IsNotEmpty,Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
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

    likedQuotes: string[]  
}