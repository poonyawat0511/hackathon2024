import { IsNotEmpty, IsString } from 'class-validator';

export class NameDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;
}
