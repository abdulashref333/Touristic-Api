import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

enum Category {
  Restaurants = 'Restaurant',
  HistoricalPlaces = 'HistoricalPlaces',
  Programs = 'Program',
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
  rating: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEnum(Category)
  category: Category;
}
