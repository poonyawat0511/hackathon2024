import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCartDto {
  @IsMongoId()
  @IsNotEmpty()
  product: string;

  @IsMongoId()
  @IsNotEmpty()
  user: string;

  @IsOptional()
  count: number;
}
