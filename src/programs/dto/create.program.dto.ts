import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProgramDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  description: string;

  // @ApiProperty()
  // @IsDefined()
  // @IsNotEmpty()
  // rating: number;

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
  @IsOptional()
  @IsArray()
  details: [
    {
      day: string;
      places: [string];
      typeOfTransport: string;
      activities: [string];
    },
  ];
}
