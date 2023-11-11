import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateQuoteDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    author: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()  
    quote: string;
}