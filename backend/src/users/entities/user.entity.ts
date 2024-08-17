import { MongoEntity } from 'src/app/common/lib/mongo.entitty';

export class UserEntity extends MongoEntity {
  name?: {
    firstname: string;
    lastname: string;
  };

  username: string;

  password: string;

  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }
}
