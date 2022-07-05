import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { HostelService } from './hostel.service';
import { CreateHostelDto } from './dto/create-hostel.dto';
import { UpdateHostelDto } from './dto/update-hostel.dto';
import { Request } from 'express';
import * as multer from 'multer';
import * as fs from 'fs';
import RoleGuard from 'src/auth/guards/role.guard';
import { Role } from 'src/user/entities/user.entity';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    const name = String(req.body.name).split(' ').join('_');
    const path = `./images/hostels/${name}`;
    if (!fs.existsSync(path)) fs.mkdirSync(path);
    cb(null, path);
  },
});

@Controller('hostels')
export class HostelController {
  constructor(private readonly hostelService: HostelService) {}

  @Post()
  @ApiBody({ type: CreateHostelDto })
  @ApiOperation({ summary: 'Create Hostel' })
  @ApiResponse({ status: 400, description: 'BadRequest.' })
  @UseInterceptors(FilesInterceptor('photos[]', 5, { storage }))
  @UseGuards(RoleGuard(Role.Admin))
  create(
    @Body() createHostelDto: CreateHostelDto,
    @UploadedFiles() files,
    @Req() req: Request,
  ) {
    const photos = files ? files.map((photo) => photo.path) : req.body.photos;
    console.log({ createHostelDto });

    return this.hostelService.create({
      ...createHostelDto,
      photos,
    });
  }

  @Post('photo/:id')
  @ApiResponse({ status: 400, description: 'BadRequest.' })
  @UseInterceptors(FilesInterceptor('photos[]', 5, { storage }))
  @UseGuards(RoleGuard(Role.Admin))
  uploadPhotos(@Param('id') id: string, @UploadedFiles() files) {
    if (!files)
      throw new HttpException(
        'Photos Must be Provided.',
        HttpStatus.BAD_REQUEST,
      );
    const photos = files.map((photo) => photo.path);
    // console.log({ files });

    return this.hostelService.update(id, { photos });
  }

  @Get()
  findAll(@Query() query) {
    return this.hostelService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hostelService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateHostelDto })
  @ApiOperation({ summary: 'Update Hostel' })
  @UseGuards(RoleGuard(null, [Role.HostelOwner, Role.Admin]))
  update(@Param('id') id: string, @Body() updateHostelDto: UpdateHostelDto) {
    return this.hostelService.update(id, updateHostelDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Hostel.' })
  @UseGuards(RoleGuard(Role.Admin))
  remove(@Param('id') id: string) {
    return this.hostelService.remove(id);
  }
}
