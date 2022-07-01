import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateRestaurantDto {
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

  // @ApiProperty()
  // @IsDefined()
  // @IsNotEmpty()
  // @IsArray()
  // photos: [string];

  // @ApiProperty()
  // @IsDefined()
  // @IsNotEmpty()
  // @IsArray()
  // menu: [string];

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsArray()
  @ArrayMaxSize(7)
  availableDays: [string];

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  openTime: number;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  closeTime: number;

  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber()
  restaurantPhoneNumber: string;

  @ApiProperty()
  @IsOptional()
  supportDelivery?: boolean;
}
