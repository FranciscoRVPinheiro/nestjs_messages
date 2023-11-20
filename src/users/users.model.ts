import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: false },
  likedQuotes: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Quote', required: false },
  ],
});

export interface User extends Document {
  readonly username: string;
  readonly password: string;
  readonly isAdmin: boolean;
  readonly likedQuotes: string[];
}
