import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/user/user.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.APP_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    // Import the module that exports the UserModel
    UsersModule, // Replace `UserModule` with the actual module name
  ],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
