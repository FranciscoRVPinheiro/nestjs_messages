import { Controller, Get, Post, Body, Param, Delete, NotFoundException } from '@nestjs/common';
import { CreateQuoteDto } from "./dtos/create-quote.dto"
import { QuotesService } from './quotes.service'

@Controller('quotes')
export class QuotesController {

    constructor(
        private service: QuotesService
    ) {}

    @Get()
    async lisQuotes(){
        const quoteList = await this.service.findAll() 
        return quoteList
    }

    @Post()
    async createQuote(@Body() body:CreateQuoteDto){
        const createQuote = await this.service.create(body)
        return createQuote
    }

    @Get('/:id')
    async getQuoteByID(@Param('id') id:string){
        const getQuote = await this.service.findOne(id)
        return getQuote
    }

    @Delete('delete/:id')
    async deleteQuote(@Param('id') id:string){
        const deleteQuote = await this.service.delete(id)
        return deleteQuote
    }

    //TODO: add search by keyword
    //TODO: add PUT method

}
