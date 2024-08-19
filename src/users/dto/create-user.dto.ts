import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString({
    message: 'Name must be string',
  })
  @IsNotEmpty()
  name: string;
}
