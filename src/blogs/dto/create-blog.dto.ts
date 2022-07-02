import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBlogsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  userId: '';

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
  @IsDefined()
  @IsNotEmpty()
  body: string;

  @ApiProperty()
  @IsOptional()
  approved: boolean;

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
