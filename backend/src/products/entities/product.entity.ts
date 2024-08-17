import { MongoEntity } from 'src/app/common/lib/mongo.entitty';
import { TransformUrl } from 'src/app/decorator/transform-url.decorator';

export class ProductEntity extends MongoEntity {
  readonly name: string;

  readonly description: string;

  readonly price: string;

  @TransformUrl({ type: 'string' })
  readonly productImage: string;

  readonly rating: string;

  constructor(partial: Partial<ProductEntity>) {
    super();
    Object.assign(this, partial);
  }
}
