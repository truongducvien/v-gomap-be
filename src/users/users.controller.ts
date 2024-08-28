import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/users/dto';
import { ApiCreatedResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getById(@Param('id') id: string): string {
    if (id === '1') throw new Error('abc error');
    return 'vien, id: ' + id;
  }

  @Post()
  @ApiCreatedResponse({ description: 'User created' })
  async createUser(@Body(ValidationPipe) payload: CreateUserDto) {
    try {
      this.usersService.createUser(payload);
    } catch (error) {
      console.log(error);
    }
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'number' })
  async deleteUser(@Param('id') id: User['id']) {
    try {
      await this.usersService.deleteUser(id);
    } catch (error) {
      console.log('error:::: ', error);
      throw new HttpException('Delete failed!', HttpStatus.BAD_REQUEST);
    }
  }
}
