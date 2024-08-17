import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ type: String, required: true, unique: true })
  readonly name: string;

  @Prop({ type: String, required: true })
  readonly description: string;

  @Prop({ type: String, required: true })
  readonly price: string;

  @Prop({ type: String })
  readonly productImage: string;

  @Prop({ type: String, required: true, default: '' })
  readonly rating: string;

  @Prop({ type: String, required: true })
  readonly type: string;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.set('toJSON', { flattenObjectIds: true, versionKey: false });
ProductSchema.set('toObject', { flattenObjectIds: true, versionKey: false });
