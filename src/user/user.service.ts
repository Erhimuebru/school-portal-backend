import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User, UserDocument, Users } from './user.schema';
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
  async createUser(createUserDto: CreateUserDto): Promise<User>
  {
    const { phoneNumber, password } = createUserDto;

    // Check if a user with the same phone number already exists
    const existingUser = await this.userModel.findOne({ phoneNumber });

    if (existingUser) {
      // User with the same phone number already exists
      throw new ConflictException('User with the same phone number already exists');
    }

    const createdUser = new this.userModel({ phoneNumber, password });

     const savedUser = await createdUser.save();
 
  return savedUser;
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
 

  
  async getSingleUser(userId: string){
    const user = await this.findUser(userId)
    return user;
  }
 
  private async findUser(id: string): Promise<Users> {
    const user = await this.userModel.findById(id)
    if(!user){
      throw new NotFoundException('Products not found')
    }
    return{
     
     id:user._id,
    phoneNumber:user.phoneNumber,
    password:user.password,
    createdAt:user.createdAt   
    }
  }
};