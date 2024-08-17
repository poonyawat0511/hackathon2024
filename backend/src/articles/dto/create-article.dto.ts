import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsMongoId()
  user: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  detail: string;

  articleImage: string;

  @IsString()
  like: string;
}
