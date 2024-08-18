import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaType, SchemaTypes, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article {
  @Prop({ type: String, required: true })
  user: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  detail: string;

  @Prop({ type: String, required: true })
  articleImage: string;

  @Prop({ type: Number, default: 0 })
  like: number;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
ArticleSchema.set('toJSON', { flattenObjectIds: true, versionKey: false });
ArticleSchema.set('toObject', { flattenObjectIds: true, versionKey: false });
