import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQuery } from './user.interface';
import { IUserModel, UserEntity } from './entities/user.entity';
import { QueryService, InjectQueryService } from '@nestjs-query/core';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: IUserModel,
    @InjectQueryService(UserEntity)
    readonly userService: QueryService<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExist = await this.userModel.findOne({
      email: createUserDto.email,
    });
    // console.log({ userExist });
    if (userExist)
      throw new HttpException(
        'This email is exist, please provide another email.',
        HttpStatus.BAD_REQUEST,
      );
    const user = {
      name: createUserDto.fisrt_name + ' ' + createUserDto.last_name,
      email: createUserDto.email,
      password: createUserDto.password,
      nationality: createUserDto.nationality,
      phone_number: createUserDto.phone_number,
      gender: createUserDto.gender,
    };

    const newUser = await this.userModel.create(user);
    return newUser.save();
  }

  async findAll(filter) {
    return Object.keys(filter).length !== 0
      ? await this.userService.query({ filter })
      : await this.userModel.find().exec();
  }

  async findOne(query: UserQuery) {
    const user = query.email
      ? this.findUserByEmail(query.email)
      : this.userModel.findById(query.id).exec();
    return user;
  }

  async count() {
    return await this.userModel.count();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userExist = await this.userModel.findById(id).exec();
    if (!userExist)
      throw new HttpException(
        'This email is exist, please provide another email.',
        HttpStatus.BAD_REQUEST,
      );
    // this update function is gonna be a common update
    Object.keys(updateUserDto).forEach((key) => {
      if (updateUserDto[key]) userExist[key] = updateUserDto[key];
    });
    const updatedUser = this.userModel
      .findByIdAndUpdate(id, userExist, {
        new: true,
      })
      .exec();
    return updatedUser;
  }

  async remove(id: string) {
    const result = await this.userModel.findByIdAndRemove(id).exec();

    return result;
  }

  async findUserByEmail(email: string) {
    return await this.userModel.findByEmail(email);
  }

  async findUserById(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async isUserExist(id?: string, email?: string) {
    if (id) return await this.findUserById(id);
    if (email) return await this.findUserByEmail(email);
    return false;
  }
}
