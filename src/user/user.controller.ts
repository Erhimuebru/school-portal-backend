import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from './user.schema';
import { UsersService } from './user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/dto/login.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DepositDto } from 'src/dto/deposit.dto';
import { WithdrawDto } from 'src/dto/withdraw.dto';
import { Transaction } from './transaction.schema';
import { AuthGuard } from '@nestjs/passport';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  // async createUser(@Body() createUserDto: CreateUserDto): Promise<User>
  // {
  //           const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

  //   return this.userService.createUser({
  //     phoneNumber: createUserDto.phoneNumber,
  //     password: hashedPassword,
  //     // balance: 0,
  //     transaction: [],
  //   });
  // }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  
  @Post('/login')
  async loginUser(@Body() loginDto: LoginDto)
  {
    
    return this.userService.loginUser(loginDto);

  }
   @UseGuards(JwtAuthGuard) // Apply JWT authentication guard to protect the routes
  @Post(':id/deposit')
  async deposit(@Param('id') userId: string, @Body() depositDto: DepositDto) {
    const { amount } = depositDto;
    const balance = await this.userService.deposit(userId, amount);
    return { message: 'Deposit successful', balance };
  }

  @UseGuards(JwtAuthGuard) // Apply JWT authentication guard to protect the routes
  @Post(':id/withdraw')
  async withdraw(@Param('id') userId: string, @Body() withdrawDto: WithdrawDto) {
    const { amount } = withdrawDto;
    const balance = await this.userService.withdraw(userId, amount);
    return { message: 'Withdrawal successful', balance };
  
  }
  
  @UseGuards(JwtAuthGuard) // Apply JWT authentication guard to protect the routes
  @Get(':id/history')
  async getTransactionHistory(@Param('id') userId: string)
  {
    return this.userService.getTransactions(userId);
  }
@UseGuards(JwtAuthGuard) // Apply JWT authentication guard to protect the routes
  @Get(':id')
  async getUser(@Param('id') userId: string)
  {
    return this.userService.getUserById(userId);
}
   
}
