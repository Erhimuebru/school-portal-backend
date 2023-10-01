import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transaction } from 'src/user/transaction.schema';
import { Document, Schema as MongooseSchema } from 'mongoose';
export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  surname: string;

  @Prop({ required: true })
  password: string;


  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  classSection: string;

  @Prop({ required: true })
  paymentStatus: string;


  @Prop({ type: [{ type: MongooseSchema.Types.Array, ref: 'ExamScores' }] })
  examScores: MongooseSchema.Types.Array[];

  @Prop({ type: [{ type: MongooseSchema.Types.Array, ref: 'TestScores' }] })
  testScores: MongooseSchema.Types.Array[];
}

export interface Users {
  id:string,
  phoneNumber: string;
  password: string;
  fullName:string;
  classSection:string;
  paymentStatus:string;
  examScores: [];
  testScores: [];
  
}


export const UserSchema = SchemaFactory.createForClass(User);
