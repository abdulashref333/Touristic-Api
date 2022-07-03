import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsDefined,
  IsLatLong,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateHistoricalPlaceDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  story: string;

  @ApiProperty()
  avgRating: number;

  @ApiProperty()
  countRating: number;
  @ApiProperty()
  sumRating: number;

  @ApiProperty()
  reviews: [{ user: string; review: string; rating: number }];

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
    city: number;
    street: number;
  };

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @ArrayMaxSize(7)
  availableDays: [
    {
      day: string;
      from: number;
      to: number;
    },
  ];

  @ApiProperty()
  @IsOptional()
  photos: [string];
}
