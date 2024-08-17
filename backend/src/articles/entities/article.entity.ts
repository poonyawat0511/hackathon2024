import { Types } from 'mongoose';
import { MongoEntity } from 'src/app/common/lib/mongo.entitty';
import { TransformId } from 'src/app/decorator/transform-id.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { User } from 'src/users/schemas/user.schema';
import { TransformUrl } from 'src/app/decorator/transform-url.decorator';

export class ArticleEntity extends MongoEntity {
  @TransformId((value) => new UserEntity(value))
  user?: Types.ObjectId | User | null;

  name: string;

  detail: string;

  @TransformUrl({ type: 'string' })
  articleImage: string;

  like: string;

  constructor(partial: Partial<ArticleEntity>) {
    super();
    Object.assign(this, partial);
  }
}
