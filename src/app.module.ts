import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
// import { TransactionsModule } from './transactions/transaction.module';
import {  UserSchema } from './user/user.schema';
import { UsersService } from './user/user.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { TransactionSchema } from './user/transaction.schema';
import { ReviewsModule } from './reviews/reviews.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://erhimuebru:dftS6ew21jiATWHi@cluster0.lye52ec.mongodb.net/school'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Transaction', schema: TransactionSchema }]),
    UsersModule,
    ReviewsModule,
    
    
  ],
  providers: [AppService, AuthModule, UsersService, JwtAuthGuard],
  controllers: [UserController],
})


export class AppModule {}
