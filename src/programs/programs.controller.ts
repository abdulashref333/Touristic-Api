import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProgramDto } from './dto/create.program.dto';
import { UpdateProgramDto } from './dto/update.program.dto';
import IProgram from './programs.interface';

import { ProgramService } from './programs.service';

@ApiTags('Programs')
@ApiBearerAuth()
@Controller('programs')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Post()
  @ApiBody({ type: CreateProgramDto })
  @ApiOperation({ summary: 'Create Program' })
  @ApiResponse({ status: 400, description: 'BadRequest.' })
  async create(@Body() createProgramDto: CreateProgramDto): Promise<IProgram> {
    return this.programService.create(createProgramDto);
  }

  @Get('/count')
  @ApiOperation({ summary: 'Get Programs Count' })
  async count(): Promise<number> {
    return await this.programService.count();
  }

  @Get()
  async findAll(): Promise<any> {
    const Programs = await this.programService.getAllPrograms();
    const count = await this.programService.count();
    return { Programs, count };
  }
  @Get(':id')
  async getUser( @Param('id') id: string): Promise<any> {
    return await this.programService.getUserInfo(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Program' })
  async remove(@Param('id') id: string): Promise<IProgram> {
    return this.programService.remove(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateProgramDto })
  @ApiOperation({ summary: 'Update Program' })
  async update(
    @Param('id') id: string,
    @Body() updateProgramDto: UpdateProgramDto,
  ): Promise<IProgram> {
    return await this.programService.update(id, updateProgramDto);
  }
}
