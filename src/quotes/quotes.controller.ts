import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
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

    @Get('search/:keyword')
    async searchByKeyword(@Param('keyword') keyword: string) {
      const results = await this.QuotesService.searchByKeyword(keyword);
      return results;
    }

    @Get('author/:author')
    async searchByAuhtor(@Param('author') author: string) {
      const results = await this.QuotesService.searchByAuthor(author);
      return results;
    }

    //TODO: add search by keyword
}
