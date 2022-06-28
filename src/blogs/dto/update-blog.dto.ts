import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogsDto } from './create-blog.dto';



export class UpdateBlogsDto extends PartialType(CreateBlogsDto) {}
