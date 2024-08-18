import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  user: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  detail: string;

  articleImage: string;

  @IsOptional()
  like: number;
}
