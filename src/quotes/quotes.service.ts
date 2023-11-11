import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quotes } from "./quotes.model"
import { CreateQuoteDto } from "./dtos/create-quote.dto"

@Injectable()
export class QuotesService {
    
    constructor(
        // @InjectModel('Quotes') private readonly quoteModel: Model<Quotes>,
        @InjectModel('Quotes') private readonly quoteModel: Model<CreateQuoteDto>,
    ) {}

    async create(doc: CreateQuoteDto) {
        const quote = await new this.quoteModel(doc).save();
        return quote.id;
      }

    async delete(id: string) {
        const quote = await this.quoteModel.deleteOne({ _id: id }).exec();
        if (quote.deletedCount === 0) {
          throw new NotFoundException(`Quote with ID ${id} not found`);
      }
    }

    async findOne(id: string) {
        return await this.quoteModel.findById(id).exec();
    }

    async findAll(){
        return await this.quoteModel.find().exec();
    }

}