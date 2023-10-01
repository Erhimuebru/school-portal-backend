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

  // @Post('register')
  // async createUser(@Body() createUserDto: CreateUserDto): Promise<User>
  // {
  //           const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

  //   return this.userService.createUser({
  //     phoneNumber: createUserDto.phoneNumber,
  //     password: hashedPassword,
  //     fullName:createUserDto.fullName,
  //     classSection:createUserDto.classSection,
  //     paymentStatus: createUserDto.paymentStatus,
  //     examScores: createUserDto.examScores,
  //     testScores: createUserDto.testScores
      
  //   });
  // }


  @Post('register')
async create(
  @Body('surname') surname: string,
  @Body('password') password: string,
  @Body('fullName') fullName: string,
  @Body('classSection') classSection: string,
  @Body('paymentStatus') paymentStatus: string,
  @Body('examScores') examScores: [],
  @Body('testScores') testScores: [],
) {
  // Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 12); // You can adjust the salt rounds (e.g., 10) as needed

  // Call your user service's create method with the hashed password
  const createId = await this.userService.create(
    surname,
    hashedPassword, // Use the hashed password here
    fullName,
    classSection,
    paymentStatus,
    examScores,
    testScores,
  );

  return { id: createId };
}




  @Post('/login')
  async loginUser(@Body() loginDto: LoginDto)
  {
    
    return this.userService.loginUser(loginDto);

  }

  @UseGuards(JwtAuthGuard) // Apply JWT authentication guard to protect the routes
  @Get(':id')
  async getUser(@Param('id') userId: string)
  {
    return this.userService.getUserById(userId);
}





// }
   
}
