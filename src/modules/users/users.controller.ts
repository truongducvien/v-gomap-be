import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiCreatedResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { ResponseInterceptor } from 'src/interceptors';
import { CreateUserDto } from './dto';

@ApiTags('Users')
@Controller('users')
@UseInterceptors(ResponseInterceptor)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<User> {
    const userId = Number(id);

    if (isNaN(userId))
      throw new HttpException('Invalid user id', HttpStatus.BAD_REQUEST);

    const result = this.usersService.getUserById(Number(id));
    return result;
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
      throw new HttpException('Delete failed!', HttpStatus.BAD_REQUEST);
    }
  }
}
