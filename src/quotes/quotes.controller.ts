import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { CreateQuoteDto } from "./dtos/create-quote.dto"
import { QuotesService } from './quotes.service'

@Controller('quotes')
export class QuotesController {

    constructor(
        private quotesService: QuotesService
    ) {}

    @Get()
    async lisQuotes(
        @Query('quote') quote:string, @Query('author') author:string) {
        const quoteList = await this.quotesService.findAll(quote, author) 
        return quoteList
    }

    @Post()
    async createQuote(@Body() body:CreateQuoteDto){
        const createQuote = await this.quotesService.create(body)
        return createQuote
    }

    @Get('/:id')
    async getQuoteByID(@Param('id') id:string){
        const getQuote = await this.quotesService.findOne(id)
        return getQuote
    }

    @Delete('/:id')
    async deleteQuote(@Param('id') id:string){
        const deleteQuote = await this.quotesService.delete(id)
        return deleteQuote
    }

    @Put('/:id')
    async getQuoteByIdAndUpdate(@Param('id') id:string, @Body() body:CreateQuoteDto){
        const patchedQuote = await this.quotesService.findAndUpdate(id, body)
        const getPatchedQuote = await this.quotesService.findOne(id)
        return getPatchedQuote
    }

}
