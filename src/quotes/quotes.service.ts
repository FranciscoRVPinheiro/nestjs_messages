import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuoteDto } from "./dtos/create-quote.dto"
import { audit } from 'rxjs';

@Injectable()
export class QuotesService {
    
    constructor(
        @InjectModel('Quotes') private readonly quoteModel: Model<CreateQuoteDto>,
    ) {}

    async create(doc: CreateQuoteDto) {
        const quote = await new this.quoteModel(doc).save();
        return quote
    }

    async delete(id: string) {
        const quote = await this.quoteModel.deleteOne({ _id: id }).exec();

        if (quote.deletedCount === 0){
            throw new NotFoundException(`Quote id ${id} not found.`)
        }

        return quote
    }

    async findOne(id: string) {
        try {
            const quote = await this.quoteModel.findById(id).exec();

            if (!quote){
                throw new NotFoundException(`Quote id ${id} not found`)
            }
    
            return quote
            
        }catch (err) {
            throw new NotFoundException(`Quote id ${id} not found`)
        }

    }

    async findAll(quote: string, author: string) {

        if (quote && !author) {
            const filteredQuotes = await this.quoteModel
                                .find( { quote: { $regex: new RegExp(quote, 'i') } })
                                .exec()
            return filteredQuotes

        }
        
        if (author && !quote) {
            const filteredAuthors = await this.quoteModel
                                .find( { author: { $regex: new RegExp(author, 'i') } })
                                .exec()
                   
            return filteredAuthors

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
          
        
        if (!author && !quote) { 
            const allQuotes = await this.quoteModel
                                .find()
                                .exec()
            return allQuotes
        }
    }

    async findAndUpdate(id:string, body: CreateQuoteDto) {
        const updatedQuote = await this.quoteModel.findByIdAndUpdate(id, body).exec();
        return updatedQuote
    }

    // TODO: Add Auth, add Users, add abilty to favorite quotes
}