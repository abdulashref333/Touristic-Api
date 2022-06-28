import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateProgramDto } from './dto/create.program.dto';
import { UpdateProgramDto } from './dto/update.program.dto';
import IProgram from './programs.interface';

import ITourGuide from './programs.interface';
import {  ProgramService } from './programs.service';

@Controller('programs')
export class ProgramController {
 constructor(private readonly  programService: ProgramService){}

 @Post()
     async create(@Body() createProgramDto: CreateProgramDto): Promise<IProgram> {
         console.log(createProgramDto)
         return this. programService.create(createProgramDto);
       }
 

       @Get('/count')
       async count(): Promise<number> {
         return await this. programService.count();
       
       }
       @Get('')
       async findAll(): Promise<any>{

        const Programs = await this. programService.getAllPrograms();
        const count = await this. programService.count();
        return { Programs, count };
      }
       

@Delete(':id')
async remove(@Param('id') id: string): Promise<IProgram> {
  return  this. programService.remove(id);
}


@Patch(':id')
async update(
  @Param('id') id: string,
  @Body() updateProgramDto: UpdateProgramDto,
): Promise<IProgram> {
  return await this. programService.update(id, updateProgramDto);
}

}


