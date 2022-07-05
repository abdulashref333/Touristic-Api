import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '../entities/user.entity';

enum Gender {
  male = 'male',
  female = 'female',
  other = 'other',
}
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  first_name: string;

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
  @IsOptional()
  avatar: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsEnum(Role)
  role: Role;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  name: string;
}
