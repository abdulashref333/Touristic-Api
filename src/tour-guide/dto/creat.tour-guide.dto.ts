import { ApiProperty } from '@nestjs/swagger';
import {
    ArrayMaxSize,
    IsArray,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';


export class CreateTourGuideDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
 title: string;

 @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
 description: string;

 @ApiProperty()
 @IsDefined()
 @IsNotEmpty()
 rating: number;

 @ApiProperty()
 @IsDefined()
 @IsNotEmpty()
 @IsNumber()
 numOfDays: number;
 

 @ApiProperty()
 @IsDefined()
 @IsNotEmpty()
 @IsNumber()
 price: number;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsArray()
  details: [{day:Date, places:[string],typeOfTransport:string,activities:[string]}];
}