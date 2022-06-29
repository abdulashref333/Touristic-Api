import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateBlogsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  title: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  subtitle: string;

  @ApiProperty()
  @IsNotEmpty()
  photo: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  body: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  tags: [string];

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date: Date;
}
