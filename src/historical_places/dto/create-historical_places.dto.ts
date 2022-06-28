import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
    ArrayMinSize,
    IsArray,
  IsDefined,
  IsNotEmpty,
  IsNumber,
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
  story:string;

  @ApiProperty()
  avgRating:number


  @ApiProperty()
  reviews:[{user:string ,review:string,rating:number}];

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsArray()
  photos:[string];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @ArrayMaxSize(2)
  location:[string];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @ArrayMaxSize(7)
  availableDays: [{
    day:string,
     from:number,
     to:number
    
  }]
}
