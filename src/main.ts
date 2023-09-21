import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const PORT = 4000
  await app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}
    Database connected successfully`)
  });
}
bootstrap();





