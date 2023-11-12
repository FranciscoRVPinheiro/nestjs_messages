import { Controller, Get, Post, Body, Param, Delete, NotFoundException, Query, Put } from '@nestjs/common';
import { CreateQuoteDto } from "./dtos/create-quote.dto"
import { QuotesService } from './quotes.service'

@Controller('quotes')
export class QuotesController {

    constructor(
        private QuotesService: QuotesService
    ) {}

    @Get()
    async lisQuotes(){
        const quoteList = await this.QuotesService.findAll() 
        return quoteList
    }

    @Post()
    async createQuote(@Body() body:CreateQuoteDto){
        const createQuote = await this.QuotesService.create(body)
        return createQuote
    }

    @Get(':id')
    async getQuoteByID(@Param('id') id:string){
        const getQuote = await this.QuotesService.findOne(id)
        return getQuote
    }

    @Delete('delete/:id')
    async deleteQuote(@Param('id') id:string){
        const deleteQuote = await this.QuotesService.delete(id)
        return deleteQuote
    }

    @Put('update/:id')
    async getQuoteByIdAndUpdate(@Param('id') id:string, @Body() body:CreateQuoteDto){
        const patchedQuote = await this.QuotesService.findAndUpdate(id, body)
        const getPatchedQuote = await this.QuotesService.findOne(id)
        return getPatchedQuote
    }

    //TODO: add search by keyword
}
