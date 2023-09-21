import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User, UserDocument } from './user.schema';
import { ConflictException } from '@nestjs/common';
import { LoginDto } from 'src/dto/login.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Transaction, TransactionDocument } from 'src/user/transaction.schema';
import { ObjectId } from 'mongoose';


@Injectable()
export class UsersService
{
 constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
  ) {}


async createUser(createUserDto: CreateUserDto): Promise<User> {
  const createdUser = new this.userModel(createUserDto);
  return createdUser.save();
}





  async loginUser(loginDto: LoginDto)
  {
    const { phoneNumber, password } = loginDto;

    // Find the user by phone number
    const user = await this.userModel.findOne({ phoneNumber });

    if (!user) {
      // User not found
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare the login password with the bcrypt encrypted password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // Invalid password
      throw new UnauthorizedException('Invalid credentials');
    }
    // Generate JWT token
    const token = jwt.sign({ phoneNumber: user.phoneNumber }, 'yourSecretKey');
    // Login successful
    return {
      message: 'Login successful',
      user: {
        phoneNumber: user.phoneNumber,
        id: user._id,
          token,
        createdAt: user.createdAt,
      },
    };
  }
  async findUserByPhoneNumber(phoneNumber: string): Promise<User>
  {
    return this.userModel.findOne({ phoneNumber }).exec();
  }
  // Import the ObjectId type from mongoose

async deposit(userId: string, amount: number): Promise<User> {
  const user = await this.userModel.findById(userId);

  if (!user) {
    throw new UnauthorizedException('User not found');
  }

  user.balance += Number(amount);

const depositTransaction = new this.transactionModel({
    amount,
    type: 'Deposit',
    createdAt: new Date(), // Add the createdAt property with the current date/time
  }) as Transaction;
  user.transactions.push(depositTransaction); // Save the deposit transaction ObjectId
// Save the transaction ObjectId

  await user.save();

  return user;
}






async withdraw(userId: string, amount: number): Promise<User> {
  const user = await this.userModel.findById(userId);

  if (!user) {
    throw new UnauthorizedException('User not found');
  }

  if (user.balance < amount) {
    throw new UnauthorizedException('Insufficient balance');
  }

  user.balance -= amount;

  const withdrawalTransaction = new this.transactionModel({
    amount,
    type: 'Withdrawal',
    createdAt: new Date(), // Add the createdAt property with the current date/time
  }) as Transaction;
  user.transactions.push(withdrawalTransaction);

  await user.save();

  return user ;
}
async getTransactions(userId: string): Promise<Transaction[]> {
  const user = await this.userModel.findById(userId).exec();

  if (!user) {
    throw new NotFoundException('User not found');
  }

  return user.transactions
}
  async getUserById(userId: string): Promise<User>
  {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }


};