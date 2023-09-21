import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UsersService } from './user.service';
import { User, UserSchema } from './user.schema';
import { Transaction } from 'mongodb';
import { TransactionSchema } from './transaction.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: 'Transaction', schema: TransactionSchema }
  ]),
  ],
  controllers: [UserController],
  providers: [UsersService],
})
export class UsersModule {}
