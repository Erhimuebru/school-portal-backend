import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transaction } from 'src/user/transaction.schema';
import mongoose, { Document } from 'mongoose';
export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 0 })
  balance: number;

  @Prop({ default: Date.now })
  createdAt: Date;

 @Prop({ type: [String], default: [] }) // Change the type to an array of strings
  examScores: string[]; // Update the type to an array of strings

  @Prop({ type: [String], default: [] }) // Change the type to an array of strings
  textScores: string[]; // Update the type to an array of strings

  @Prop({ type: [String], default: [] })
  transactions: Transaction[];
}


export const UserSchema = SchemaFactory.createForClass(User);
