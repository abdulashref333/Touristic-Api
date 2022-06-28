import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import IBlogs from './blogs.interface';
import { BlogsService } from './blogs.service';
import { CreateBlogsDto } from './dto/create-blog.dto';
import { UpdateBlogsDto } from './dto/update-blog.dto';

@Controller('blogs')
export class BlogsController {

    constructor(private readonly blogsService:BlogsService){}

    @Post()
    async create(@Body() CreateBlogsDto: CreateBlogsDto): Promise<IBlogs> {
        console.log(CreateBlogsDto)
        return this.blogsService.create(CreateBlogsDto);
      }
 
      
    @Get('/count')
    async count(): Promise<number> {
        return await this.blogsService.count();
      
      }


    @Get()
    async findAll(): Promise<any>{

       const blogs = await this.blogsService.getAllBlogs();
       const count = await this.blogsService.count();
       return { blogs, count };
     }
     

    @Patch(':id')
     async update(
       @Param('id') id: string,
       @Body() updateBlogsDto: UpdateBlogsDto,
     ): Promise<IBlogs> {
       return await this.blogsService.update(id, updateBlogsDto);
     }

    @Delete(':id')
     async remove(@Param('id') id: string): Promise<IBlogs> {
       return  this.blogsService.remove(id);
     }


}
