import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
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

  @Get()
  @ApiResponse({
    type: [GetUserDto],
  })
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get('current-user')
  @ApiResponse({
    type: GetUserDto,
  })
  getCurrentUser(@Req() req: any): Promise<GetUserDto> {
    const user = req['user'];
    if (!user) throw new NotFoundException('Can not find current user.');
    return user;
  }

  @Get(':id')
  @ApiResponse({
    type: GetUserDto,
  })
  async getById(@Param('id', ParseIntPipe) id: number): Promise<GetUserDto> {
    const result = await this.usersService.findById(id);

    if (!result) throw new BadRequestException('User does not exist.');
    return new GetUserDto(result);
  }

  @Post()
  @ApiCreatedResponse({ description: 'User created', type: CreateUserDto })
  async createUser(@Body(ValidationPipe) payload: CreateUserDto) {
    const isExisted = await this.usersService.findByEmail(payload.email);
    if (isExisted) throw new BadRequestException('Email has already existed.');

    const newUser = await this.usersService.create(payload);
    if (!newUser) throw new InternalServerErrorException('Create failed.');
    return new GetUserDto(newUser);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'number' })
  async deleteUser(@Param('id', ParseIntPipe) id: User['id']) {
    const isExisted = await this.usersService.findById(id);
    if (!isExisted) throw new BadRequestException('User does not exist.');

    const deleted = await this.usersService.deleteUser(id);
    if (!deleted) throw new InternalServerErrorException('Delete failed!');
  }
}
