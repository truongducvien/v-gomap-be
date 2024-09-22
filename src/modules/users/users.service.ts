import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: User['id']): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: User['email']): Promise<User> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(payload: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data: payload });
  }

  async deleteUser(userId: User['id']) {
    return this.prisma.user.delete({ where: { id: Number(userId) } });
  }
}
