import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CreateUserDto, GetUserDto } from './users.dto';
import { ResponseInterceptor } from 'src/interceptors';
import { AppAuthGuard } from '../auth/auth.guard';

@Controller('users')
@ApiTags('Users')
@UseGuards(AppAuthGuard)
@ApiBearerAuth()
@UseInterceptors(ResponseInterceptor)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiResponse({
    type: [GetUserDto],
  })
  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get('current-user')
  getCurrentUser(@Req() req: any): any {
    const user = req['user'];
    if (!user) throw new NotFoundException('Can not find current user.');
    return user;
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const result = this.usersService.findById(id);
    return result;
  }

  @Post()
  @ApiCreatedResponse({ description: 'User created' })
  async createUser(@Body(ValidationPipe) payload: CreateUserDto) {
    try {
      this.usersService.create(payload);
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
