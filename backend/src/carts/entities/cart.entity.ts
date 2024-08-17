import { Types } from 'mongoose';
import { MongoEntity } from 'src/app/common/lib/mongo.entitty';
import { TransformId } from 'src/app/decorator/transform-id.decorator';
import { ProductEntity } from 'src/products/entities/product.entity';
import { Product } from 'src/products/schemas/product.schema';
import { UserEntity } from 'src/users/entities/user.entity';
import { User } from 'src/users/schemas/user.schema';

export class CartEntity extends MongoEntity {
  @TransformId((value) => new UserEntity(value))
  user?: Types.ObjectId | User | null;

  @TransformId((value) => new ProductEntity(value))
  product?: Types.ObjectId | Product | null;

  count: number;

  constructor(partial: Partial<CartEntity>) {
    super();
    Object.assign(this, partial);
  }
}
