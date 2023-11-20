import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const QuotesSchema = new mongoose.Schema({
  author: { type: String, required: true },
  quote: { type: String, required: true },
  id: { type: String, required: false },
});

export interface Quote extends Document {
  readonly author: string;
  readonly quote: string;
  readonly id: string;
}

// "id": "6558fe47a3f53626ef5c6408"
