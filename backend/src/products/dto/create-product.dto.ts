import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  readonly productImage: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly price: string;



  @IsNotEmpty()
  @IsString()
  readonly rating: string;

  @IsNotEmpty()
  @IsString()
  readonly type: string;
}
