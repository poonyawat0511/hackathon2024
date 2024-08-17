import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop(
    raw({
      firstname: { type: String, require: true },
      lastname: { type: String, require: true },
    }),
  )
  name: { firstname: string; lastname: string };

  @Prop({ type: String, required: true, unique: true })
  username: string;

  @Prop({ type: String, required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.set('toJSON', { flattenObjectIds: true, versionKey: false });
UserSchema.set('toObject', { flattenObjectIds: true, versionKey: false });
