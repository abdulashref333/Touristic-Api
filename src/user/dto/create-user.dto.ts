import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsEnum,
  isEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

enum Gender {
  male = 'male',
  femal = 'female',
  other = 'other',
}
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  fisrt_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  last_name: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nationality: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEnum(Gender)
  gender: Gender;
}
