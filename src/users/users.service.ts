import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async createUser(payload: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data: payload });
  }

  async deleteUser(userId: User['id']) {
    return this.prisma.user.delete({ where: { id: Number(userId) } });
  }
}
