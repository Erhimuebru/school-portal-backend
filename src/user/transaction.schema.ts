import { Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Prop } from '@nestjs/mongoose';

export type TransactionDocument = Transaction & Document;


@Schema()
export class Transaction {
  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  type: string;

  @Prop({ required: Date.now })
  createdAt:Date
}
export const TransactionSchema = SchemaFactory.createForClass(Transaction);
