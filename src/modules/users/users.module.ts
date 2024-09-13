import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
