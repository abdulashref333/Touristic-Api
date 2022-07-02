import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateHostelDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  description: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsArray()
  @ArrayMaxSize(2)
  location: [string];

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  nightPrice: number;
}
