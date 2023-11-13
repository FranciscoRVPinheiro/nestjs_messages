import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CreateQuoteDto } from "./dtos/create-quote.dto"
import { QuotesService } from './quotes.service'
import { ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';

@Controller('quotes')
export class QuotesController {

    constructor(
        private quotesService: QuotesService
    ) {}

    @Get()
    @ApiOkResponse({
        description: 'Gets all quotes.'
    })
    async lisQuotes(){
        const quoteList = await this.quotesService.findAll() 
        return quoteList
    }

    @Post()
    async createQuote(@Body() body:CreateQuoteDto){
        const createQuote = await this.quotesService.create(body)
        return createQuote
    }

    
    @Get(':id')
    @ApiOkResponse({
        description: 'Gets quote by ID.'
    })
    @ApiBadRequestResponse()
    async getQuoteByID(@Param('id') id:string){
        const getQuote = await this.quotesService.findOne(id)
        return getQuote
    }

    @Delete('delete/:id')
    async deleteQuote(@Param('id') id:string){
        const deleteQuote = await this.quotesService.delete(id)
        return deleteQuote
    }

    @Put('update/:id')
    async getQuoteByIdAndUpdate(@Param('id') id:string, @Body() body:CreateQuoteDto){
        const patchedQuote = await this.quotesService.findAndUpdate(id, body)
        const getPatchedQuote = await this.quotesService.findOne(id)
        return getPatchedQuote
    }

    @Get('search/:keyword')
    async searchByKeyword(@Param('keyword') keyword: string) {
      const results = await this.quotesService.searchByKeyword(keyword);
      return results;
    }

    @Get('author/:author')
    async searchByAuhtor(@Param('author') author: string) {
      const results = await this.quotesService.searchByAuthor(author);
      return results;
    }
}
