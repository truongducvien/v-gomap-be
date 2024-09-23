import { ApiProperty } from '@nestjs/swagger';

export class LogInResponseDto {
  @ApiProperty()
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken || '';
  }
}
