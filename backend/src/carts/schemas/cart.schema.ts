import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';
import { User } from 'src/users/schemas/user.schema';

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId | User;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Product', required: true })
  product: Types.ObjectId | Product;

  @Prop({ type: Number, default: 0 })
  count: number;
}
export const CartSchema = SchemaFactory.createForClass(Cart);
CartSchema.set('toJSON', { flattenObjectIds: true, versionKey: false });
CartSchema.set('toObject', { flattenObjectIds: true, versionKey: false });
