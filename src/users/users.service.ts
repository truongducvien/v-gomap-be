import { Injectable } from '@nestjs/common';
import { GetUserDto } from 'src/users/dto';
import { User } from 'src/users/interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  getUsers(): GetUserDto[] {
    return this.users;
  }
}
