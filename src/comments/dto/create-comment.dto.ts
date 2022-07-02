import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  blogId: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  body: string;
}
