import { IsString, IsNotEmptyObject, IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
    @IsString()
    @IsNotEmpty()
    author: string;

    @IsString()
    @IsNotEmpty()  
    quote: string;
}