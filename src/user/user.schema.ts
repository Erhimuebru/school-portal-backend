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


  @Prop({ default: Date.now })
  createdAt: Date;

}

export interface Users {
  id:string,
  phoneNumber:string,
  password:string,
  createdAt:Date 
  
}


export const UserSchema = SchemaFactory.createForClass(User);
