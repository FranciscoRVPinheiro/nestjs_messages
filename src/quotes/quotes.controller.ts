import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-quote.dto';
import { QuotesService } from './quotes.service'

@Controller('quotes')
export class QuotesController {

    messageService: QuotesService;

    constructor() {
        // DONT DO IT IN REAL APPS. Use dependency injection.
        this.messageService = new QuotesService()
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

    @Get('author/:author')
    getAuthor(@Param('author') author:string) {
        return this.messageService.findByAuthor(author)
    }

    //TODO: add search by keyword
    //TODO: add PUT and DELETE methods

}
