import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Category } from './create-review.dto';

export class GetReviewDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  itemId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEnum(Category)
  category: Category;
}
