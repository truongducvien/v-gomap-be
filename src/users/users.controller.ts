import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, GetUserDto } from 'src/users/dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(): GetUserDto[] {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getById(@Param('id') id: string): string {
    if (id === '1') throw new Error('abc error');
    return 'vien, id: ' + id;
  }

  @Post()
  createUser(@Body(ValidationPipe) payload: CreateUserDto) {
    console.log('create:: ', payload);
    return 'User created';
  }
}
