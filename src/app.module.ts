import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    
      ConfigModule.forRoot(), 
      MongooseModule.forRootAsync({
        useFactory: async () => ({
          uri: "mongodb+srv://erhimuebru:dftS6ew21jiATWHi@cluster0.lye52ec.mongodb.net/foodpadi", 
        }),
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
