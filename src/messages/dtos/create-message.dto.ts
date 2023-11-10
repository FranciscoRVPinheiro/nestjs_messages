import { IsString } from 'class-validator';

export class CreateMessageDto {
    @IsString()
    author: string
    quote: string
}