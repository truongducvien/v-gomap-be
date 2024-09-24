import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email is invalid' })
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  profileUrl?: string;

  @ApiProperty()
  provider?: string;

  constructor(newUser: Omit<User, 'id'>) {
    Object.assign(this, newUser);
  }
}

export class GetUserDto extends CreateUserDto {
  @ApiProperty()
  id: string;

  constructor(user: User) {
    super(user);
    Object.assign(this, user);
  }
}
