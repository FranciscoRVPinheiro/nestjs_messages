import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuoteDto } from "./dtos/create-quote.dto"

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

        if (!quote){
            throw new NotFoundException(`Quote id ${id} not found.`)
        }
                
        return quote
    }

    async findOne(id: string) {
        const quote = await this.quoteModel.findById(id).exec();

        if (!quote){
            throw new NotFoundException(`Quote id ${id} not found.`)
        }

        return quote
    }

    async findAll(){
        const allQuotes = await this.quoteModel.find().exec();
        return allQuotes
    }

    async findAndUpdate(id:string, body: CreateQuoteDto) {
        const updatedQuote = await this.quoteModel.findByIdAndUpdate(id, body).exec();
        return updatedQuote
    }
}