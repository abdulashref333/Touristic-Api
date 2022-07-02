import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
} from 'class-validator';

export enum Category {
  Restaurants = 'Restaurant',
  HistoricalPlaces = 'HistoricalPlaces',
  Programs = 'Program',
  Hostel = 'Hostel',
}
export class CreateReviewDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  itemId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  body: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @Max(5)
  rating: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEnum(Category)
  category: Category;
}
