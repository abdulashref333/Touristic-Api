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
  @IsOptional()
  photos: [string];

  @ApiProperty()
  @IsOptional()
  menu: [string];

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
