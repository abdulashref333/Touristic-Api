import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsDefined,
  IsLatLong,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
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
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(2)
  location: [string];

  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  address: {
    country: string;
    city: string;
    street: string;
  };

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  nightPrice: number;

  @ApiProperty()
  @IsOptional()
  photos: [string];
}
