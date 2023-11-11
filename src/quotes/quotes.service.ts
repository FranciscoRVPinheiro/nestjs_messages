import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuoteDto } from "./dtos/create-quote.dto"

@Injectable()
export class QuotesService {
    
    constructor(
        // @InjectModel('Quotes') private readonly quoteModel: Model<Quotes>,
        @InjectModel('Quotes') private readonly quoteModel: Model<CreateQuoteDto>,
    ) {}

    async create(doc: CreateQuoteDto) {
        const quote = await new this.quoteModel(doc).save();
        return quote
    }

    async delete(id: string) {
        const quote = await this.quoteModel.deleteOne({ _id: id }).exec();
        return quote
    }

    async findOne(id: string) {
        const quote = await this.quoteModel.findById(id).exec();
        return quote
    }

    async findAll(){
        const allQuotes = await this.quoteModel.find().exec();
        return allQuotes
    }

    async findAndUpdate(id:string, doc: CreateQuoteDto) {
        const updatedQuote = await this.quoteModel.findByIdAndUpdate(id, doc).exec();
        return updatedQuote
    }

}