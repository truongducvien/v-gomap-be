import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getTokenFromRequestHeader } from 'src/helpers';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './auth.interface';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

export class GoogleAuthGuard extends AuthGuard('google') {
  constructor(private configService: ConfigService) {
    super({
      accessType: 'offline',
    });
  }
}

export class FacebookAuthGuard extends AuthGuard('facebook') {
  constructor(private configService: ConfigService) {
    super({
      accessType: 'offline',
    });
  }
}
@Injectable()
export class AppAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const token = getTokenFromRequestHeader(req);
    if (!token) throw new UnauthorizedException('Invalid token');

    let decoded: JwtPayload;
    try {
      decoded = this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }

    const result = await this.usersService.findByEmail(decoded.email);
    if (!result) throw new NotFoundException('Email does not exist.');

    req['user'] = result; // Set user info into request if request is authenticated
    return true;
  }
}
