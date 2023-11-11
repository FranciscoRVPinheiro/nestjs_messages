import * as mongoose from 'mongoose';

export const QuotesSchema = new mongoose.Schema({
  author: { type: String, required: true },
  quote: { type: String, required: true },
  id: { type: String, required: false }
});
