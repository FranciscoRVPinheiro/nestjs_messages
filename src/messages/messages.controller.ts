import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service'

@Controller('messages')
export class MessagesController {

    messageService: MessagesService;

    constructor() {
        // DONT DO IT IN REAL APPS. Use dependency inbjection.
        this.messageService = new MessagesService()
    }

    @Get()
    lisMessages(){
        return this.messageService.findAll()
    }

    @Post()
    createMessages(@Body() body:CreateMessageDto){
        return this.messageService.create(body.author, body.quote)
    }

    @Get('/:id')
    getMessage(@Param('id') id:string){
        return this.messageService.findOne(id)
    }

}
