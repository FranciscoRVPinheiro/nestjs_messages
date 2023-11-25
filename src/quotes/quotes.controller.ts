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
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Guard } from 'src/auth/auth.guard';

@ApiTags('Quotes')
@Controller('quotes')
export class QuotesController {
  constructor(private quotesService: QuotesService) {}

  @ApiQuery({
    name: 'author',
    type: String,
    description: 'Optional',
    required: false,
  })
  @ApiQuery({
    name: 'quote',
    type: String,
    description: 'Optional',
    required: false,
  })
  @Get()
  async lisQuotes(@Query() query: { author?: string; quote?: string }) {
    const quoteList = await this.quotesService.findAll(
      query.quote,
      query.author,
    );
    return quoteList;
  }

  @ApiBearerAuth()
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

  @ApiBearerAuth()
  @UseGuards(Guard)
  @Delete('/:id')
  async deleteQuote(@Param('id') id: string, @Request() req: any) {
    const deleteQuote = await this.quotesService.delete(id, req);
    return deleteQuote;
  }

  @ApiBearerAuth()
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

  @Get('random/quote')
  async findRandomQuote() {
    return await this.quotesService.findRandom();
  }
}
