import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuoteDto } from './dtos/create-quote.dto';
import { Quote } from './quotes.model';
import { User } from 'src/users/users.model';

@Injectable()
export class QuotesService {
  constructor(
    @InjectModel('Quotes') private readonly quoteModel: Model<Quote>,
    @InjectModel('Users') private readonly usersModel: Model<User>,
  ) {}

  async create(doc: CreateQuoteDto, req: any) {
    try {
      const tokenInfo = req.user;
      const user = await this.usersModel.findById(tokenInfo.sub).exec();

      if (!user.isAdmin) {
        throw new UnauthorizedException();
      }

      const quote = await new this.quoteModel(doc).save();
      return {
        author: quote.author,
        quote: quote.quote,
      };
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  async delete(id: string, req: any) {
    try {
      const tokenInfo = req.user;
      const user = await this.usersModel.findById(tokenInfo.sub).exec();

      if (!user.isAdmin) {
        throw new UnauthorizedException();
      }

      const quote = await this.quoteModel.deleteOne({ _id: id }).exec();

      return quote;
    } catch {
      throw new UnauthorizedException();
    }
  }

  async findOne(id: string) {
    try {
      const quote = await this.quoteModel.findById(id).exec();
      return quote;
    } catch (err) {
      throw new NotFoundException(`Quote id ${id} not found`);
    }
  }

  async findAll(quote?: string, author?: string) {
    if (quote && !author) {
      const filteredQuotes = await this.quoteModel
        .find({ quote: { $regex: new RegExp(quote, 'i') } })
        .exec();
      return filteredQuotes;
    }

    if (author && !quote) {
      const filteredAuthors = await this.quoteModel
        .find({ author: { $regex: new RegExp(author, 'i') } })
        .exec();
      return filteredAuthors;
    }

    if (author && quote) {
      const filteredAuthorsAndQuote = await this.quoteModel.find().exec();

      const newQuotesArray = [];

      for (const quoteObject of filteredAuthorsAndQuote) {
        const normalizedAuthor = quoteObject.author.toLowerCase();
        const normalizedQuote = quoteObject.quote.toLowerCase();

        if (
          normalizedAuthor.includes(author.toLowerCase()) &&
          normalizedQuote.includes(quote.toLowerCase())
        ) {
          newQuotesArray.push(quoteObject);
        }
      }

      return newQuotesArray;
    }

    const allQuotes = await this.quoteModel.find().exec();
    return allQuotes;
  }

  async findAndUpdate(id: string, body: CreateQuoteDto) {
    const updatedQuote = await this.quoteModel
      .findByIdAndUpdate(id, body)
      .exec();
    return updatedQuote;
  }
}
