import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';
import {
  ErrorBuilder,
  ErrorMethod,
  RequestAction,
} from 'src/app/common/utils/error.util';

@Injectable()
export class ProductsService {
  private readonly errorBuilder = new ErrorBuilder('Product', 'Products');

  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const productDoc = new this.productModel(createProductDto);
      const product = await productDoc.save();
      return product.toObject();
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

  async findAll(): Promise<Product[]> {
    const product = await this.productModel.find().lean();
    return product;
  }

  async findOne(id: string): Promise<Product> {
    try {
      const product = await this.productModel.findById(id).lean();
      if (!product) {
        throw new ConflictException(
          this.errorBuilder.build(ErrorMethod.notFound, { id }),
        );
      }
      return product;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      const exists = this.productModel.exists({ _id: id });
      if (!exists) {
        throw new NotFoundException(
          this.errorBuilder.build(ErrorMethod.notFound, { id }),
        );
      }
      const options = { new: true };
      const product = await this.productModel
        .findByIdAndUpdate(id, updateProductDto, options)
        .lean();
      return product;
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

  async remove(id: string): Promise<Product> {
    try {
      const product = await this.productModel.findByIdAndDelete(id).lean();
      if (!product) {
        throw new ConflictException(
          this.errorBuilder.build(ErrorMethod.notFound, { id }),
        );
      }
      return product;
    } catch (error) {
      throw error;
    }
  }
}
