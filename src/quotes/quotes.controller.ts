import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateQuoteDto } from './dtos/create-quote.dto';
import { QuotesService } from './quotes.service';
import { ApiTags } from '@nestjs/swagger';
import { Guard } from 'src/auth/auth.guard';

@ApiTags('Quotes')
@Controller('quotes')
export class QuotesController {
  constructor(private quotesService: QuotesService) {}

  @Get()
  async lisQuotes(
    @Query('quote') quote?: string,
    @Query('author') author?: string,
  ) {
    const quoteList = await this.quotesService.findAll(quote, author);
    return quoteList;
  }
  @UseGuards(Guard)
  @Post()
  async createQuote(@Body() body: CreateQuoteDto, @Request() req: any) {
    const createQuote = await this.quotesService.create(body, req);
    return createQuote;
  }

  @Get('/:id')
  async getQuoteByID(@Param('id') id: string) {
    const getQuote = await this.quotesService.findOne(id);
    return getQuote;
  }
  @UseGuards(Guard)
  @Delete('/:id')
  async deleteQuote(@Param('id') id: string, @Request() req: any) {
    const deleteQuote = await this.quotesService.delete(id, req);
    return deleteQuote;
  }
  @UseGuards(Guard)
  @Put('/:id')
  async getQuoteByIdAndUpdate(
    @Param('id') id: string,
    @Body() body: CreateQuoteDto,
    @Request() req: any,
  ) {
    await this.quotesService.findAndUpdate(id, body, req);
    const getPatchedQuote = await this.quotesService.findOne(id);
    return getPatchedQuote;
  }
}
