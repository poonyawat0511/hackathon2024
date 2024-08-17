import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { read } from 'fs';
import {
  ErrorBuilder,
  ErrorMethod,
  RequestAction,
} from 'src/app/common/utils/error.util';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { error } from 'console';

@Injectable()
export class UsersService {
  private readonly errorBuilder = new ErrorBuilder('User', 'Users');

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const userDoc = new this.userModel(createUserDto);
      const user = await userDoc.save();
      return user.toObject();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          this.errorBuilder.build(ErrorMethod.duplicated, {
            action: RequestAction.create,
          }),
        );
      }
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    const user = await this.userModel.find().lean();
    return user;
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id).lean();
      if (!user) {
        throw new ConflictException(
          this.errorBuilder.build(ErrorMethod.notFound, { id }),
        );
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const exists = this.userModel.exists({ _id: id });
      if (!exists) {
        throw new NotFoundException(
          this.errorBuilder.build(ErrorMethod.notFound, { id }),
        );
      }
      const options = { new: true };
      const user = await this.userModel
        .findByIdAndUpdate(id, updateUserDto, options)
        .lean();
      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          this.errorBuilder.build(ErrorMethod.duplicated, {
            action: RequestAction.update,
          }),
        );
      }
      throw error;
    }
  }

  async remove(id: string): Promise<User> {
    try {
      const user = await this.userModel.findByIdAndDelete(id).lean();
      if (!user) {
        throw new ConflictException(
          this.errorBuilder.build(ErrorMethod.notFound, { id }),
        );
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}
