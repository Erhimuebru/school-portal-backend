import { Body, Controller, Get, NotFoundException, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from './user.schema';
import { UsersService } from './user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/dto/login.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';



@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User>
  {
            const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

    return this.userService.createUser({
      phoneNumber: createUserDto.phoneNumber,
      password: hashedPassword,
      
    });
  }
  @Post('/login')
  async loginUser(@Body() loginDto: LoginDto)
  {
    
    return this.userService.loginUser(loginDto);

  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
getSingleUser(@Param('id') UserId: string) {
    return this.userService.getSingleUser(UserId);
  }





// }
   
}
