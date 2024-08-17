import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { NameDto } from './name.dto';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsObject()
  @ValidateNested()
  @Type(() => NameDto)
  name: NameDto;

  @IsString()
  username: string;

  @IsNotEmpty()
  password: string;
}
