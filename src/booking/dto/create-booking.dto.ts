import { Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: 'created', updatedAt: 'updated' } })
export class CreateBookingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  hostelOwnerId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  hostelId: string;

  @ApiProperty()
  @IsOptional()
  gender: string;

  @ApiProperty()
  @IsOptional()
  nationality: string;

  @ApiProperty()
  @IsOptional()
  approved: boolean;

  @ApiProperty()
  @IsOptional()
  rejected: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  from: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  to: Date;
}
