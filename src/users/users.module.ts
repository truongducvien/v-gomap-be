import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
// import { TestMiddleWare } from 'src/middlewares';
import { USERS_ROUTE } from './route';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(TestMiddleWare).forRoutes(USERS_ROUTE.userDetail);
  }
}
