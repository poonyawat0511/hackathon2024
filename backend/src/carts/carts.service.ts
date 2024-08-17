import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import {
  ErrorBuilder,
  ErrorMethod,
  RequestAction,
} from 'src/app/common/utils/error.util';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './schemas/cart.schema';
import { Model } from 'mongoose';

@Injectable()
export class CartsService {
  private readonly errorBuilder = new ErrorBuilder('Cart', 'Carts');

  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    try {
      const cartDoc = new this.cartModel(createCartDto);
      const cart = await cartDoc.save();
      return cart.toObject();
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

  async findAll(): Promise<Cart[]> {
    const cart = await this.cartModel.find().lean();
    return cart;
  }

  async findOne(id: string): Promise<Cart> {
    try {
      const cart = await this.cartModel
        .findById(id)
        .populate({ path: 'user', select: 'username' })
        .populate('product')
        .lean();
      if (!cart) {
        throw new ConflictException(
          this.errorBuilder.build(ErrorMethod.notFound, { id }),
        );
      }
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateCartDto: UpdateCartDto): Promise<Cart> {
    try {
      const exists = this.cartModel.exists({ _id: id });
      if (!exists) {
        throw new NotFoundException(
          this.errorBuilder.build(ErrorMethod.notFound, { id }),
        );
      }
      const options = { new: true };
      const cart = await this.cartModel
        .findByIdAndUpdate(id, updateCartDto, options)
        .lean();
      return cart;
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

  async remove(id: string): Promise<Cart> {
    try {
      const cart = await this.cartModel.findByIdAndDelete(id).lean();
      if (!cart) {
        throw new ConflictException(
          this.errorBuilder.build(ErrorMethod.notFound, { id }),
        );
      }
      return cart;
    } catch (error) {
      throw error;
    }
  }
}
