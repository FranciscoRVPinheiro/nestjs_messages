import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateQuoteDto } from "./dtos/create-quote.dto"
import { QuotesService } from './quotes.service'

@Controller('quotes')
export class QuotesController {

    constructor(
        private service: QuotesService
    ) {}

    @Get()
    lisQuotes(){
        return this.service.findAll()
    }

    @Post()
    createQuote(@Body() body:CreateQuoteDto){
        return this.service.create(body)
    }

    @Get('/:id')
    getQuoteByID(@Param('id') id:string){
        return this.service.findOne(id)
    }

    @Delete('delete/:id')
    deleteQuote(@Param('id') id:string){
        return this.service.delete(id)
    }

    // @Get('author/:author')
    // getAuthor(@Param('author') author:string) {
    //     return this.service.findByAuthor(author)
    // }

    //TODO: add search by keyword
    //TODO: add PUT method

}
