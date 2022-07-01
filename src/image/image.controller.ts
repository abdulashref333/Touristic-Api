import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as path from 'path';

const ROOT_PATH = path.join(__dirname + '../../../');

@Controller('images')
export class ImageController {
  @Get()
  async getImage(@Req() req: Request, @Res() res: Response) {
    const params = { ...req.body, ...req.query, ...req.params };
    // console.log({ params });
    if (!params || !params.path.length)
      throw new HttpException(
        'please provide an image path.',
        HttpStatus.BAD_REQUEST,
      );
    const path = ROOT_PATH + params.path;
    // console.log({ path });
    res.type('png');
    return res.sendFile(path);
  }
}
