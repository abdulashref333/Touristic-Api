import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QueryService, InjectQueryService } from '@nestjs-query/core';
import { IProgramModel, ProgramEntity } from './entities/program.entity';
import { CreateProgramDto } from './dto/create.program.dto';
import { UpdateProgramDto } from './dto/update.program.dto';
import { UtilsService } from 'src/common/utils/utils.service';

@Injectable()
export class ProgramService {
  constructor(
    @InjectModel('Program') private programModel: IProgramModel,
    @InjectQueryService(ProgramEntity)
    readonly ProgramService: QueryService<ProgramEntity>,
    private utileService: UtilsService,
  ) {}

  async create(createProgramDto: CreateProgramDto) {
    const programExist = await this.programModel.findOne({
      title: createProgramDto.title,
    });

    if (programExist)
      throw new HttpException(
        'This program is exist, please provide another program.',
        HttpStatus.BAD_REQUEST,
      );

    const program = {
      userId: createProgramDto.userId,
      title: createProgramDto.title,
      description: createProgramDto.description,
      numOfDays: createProgramDto.numOfDays,
      price: createProgramDto.price,
      details: createProgramDto.details,
    };

    const newProgram = await this.programModel.create(program);
    return newProgram.save();
  }

  async count() {
    const count = await this.programModel.count();
    return await count;
  }

  async getAllPrograms(filter) {
    filter = this.utileService.parseQuery(filter);

    return Object.keys(filter).length !== 0
      ? await this.ProgramService.query(filter)
      : await this.programModel
          .find()
          .limit(10)
          .populate('userId', 'name email avatar gender -_id');
    // return await this.programModel.find().populate('userId');
  }

  async getProgramById(id: string) {
    const programs = await this.programModel
      .findOne({ userId: id })
      .select('userId')
      .populate('userId');
    return { user: programs.userId };
  }

  // async getProgramById(id)

  async remove(id: string) {
    const result = await this.programModel.findByIdAndRemove(id).exec();

    return result;
  }

  async update(id: string, updateProgramDto: UpdateProgramDto) {
    const ProgramExist = await this.programModel.findById(id).exec();
    if (!ProgramExist)
      throw new HttpException(
        'This program is not exist, please provide valid program.',
        HttpStatus.BAD_REQUEST,
      );

    // this update function is gonna be a common update
    Object.keys(updateProgramDto).forEach((key) => {
      ProgramExist[key] = updateProgramDto[key];
    });

    const updatedProgram = this.programModel
      .findByIdAndUpdate(id, ProgramExist, {
        new: true,
      })
      .exec();
    return updatedProgram;
  }
}
