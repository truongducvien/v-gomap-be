import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Query,
  Redirect,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { JwtPayload, AuthServiceUser } from './auth.interface';
import { LogInResponseDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { FacebookAuthGuard, GoogleAuthGuard } from './auth.guard';
import { generateRedirectUrl } from 'src/helpers';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  // Require to pass the param 'redirect' to the api request url
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {}

  @Get('google-redirect')
  @UseGuards(GoogleAuthGuard)
  @Redirect()
  async googleRedirect(@Request() req) {
    const googleUserRes = req.user as AuthServiceUser; // Google strategy returned the value and assigned user value to the request
    const { email, firstName, lastName, picture, provider } = googleUserRes;

    const existedUser = await this.userService.findByEmail(googleUserRes.email);
    let payload: JwtPayload;

    if (!existedUser) {
      const newUser = await this.userService.create({
        email,
        firstName,
        lastName,
        profileUrl: picture,
        provider,
      });
      payload = { email: newUser.email };
    } else {
      payload = { email: existedUser.email };
    }

    const authToken = this.jwtService.sign(payload as JwtPayload);

    const redirectUrl = req.query.state; // The param redirect had been put inside OAuth state in AuthGuard
    if (!redirectUrl) {
      throw new BadRequestException('Redirect url is required');
    }

    const newRedirectUrl = generateRedirectUrl(redirectUrl, {
      token: authToken,
    });
    if (!newRedirectUrl) {
      throw new BadRequestException('Invalid redirect url');
    }

    return {
      url: newRedirectUrl,
    };
  }

  // Require to pass the param 'redirect' to the api request url
  @Get('facebook')
  @UseGuards(FacebookAuthGuard)
  async facebookAuth() {}

  @Get('facebook-redirect')
  @UseGuards(FacebookAuthGuard)
  @Redirect()
  async facebookRedirect(@Request() req) {
    const fbUserRes = req.user as AuthServiceUser; // Facebook strategy returned the value and assigned user value to the request
    const { email, firstName, lastName, picture, provider } = fbUserRes;

    const existedUser = await this.userService.findByEmail(fbUserRes.email);
    let payload: JwtPayload;

    if (!existedUser) {
      const newUser = await this.userService.create({
        email,
        firstName,
        lastName,
        profileUrl: picture,
        provider,
      });
      payload = { email: newUser.email };
    } else {
      payload = { email: existedUser.email };
    }

    const authToken = this.jwtService.sign(payload as JwtPayload);

    const redirectUrl = req.query.state; // The param redirect had been put inside OAuth state in AuthGuard
    if (!redirectUrl) {
      throw new BadRequestException('Redirect url is required');
    }

    const newRedirectUrl = generateRedirectUrl(redirectUrl, {
      token: authToken,
    });
    if (!newRedirectUrl) {
      throw new BadRequestException('Invalid redirect url');
    }

    return {
      url: newRedirectUrl,
    };
  }

  @Get('log-in')
  @ApiResponse({
    type: LogInResponseDto,
  })
  async logIn(@Query('token') token: string): Promise<LogInResponseDto> {
    let decoded: JwtPayload;
    try {
      decoded = this.jwtService.verify<JwtPayload>(token);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.userService.findByEmail(decoded.email);
    if (!user) throw new NotFoundException('User does not exist');
    const payload: JwtPayload = { email: user.email };

    let accessToken: string;
    try {
      accessToken = this.jwtService.sign(payload, {
        expiresIn: 24 * 60 * 60,
      });
      return new LogInResponseDto(accessToken);
    } catch {
      throw new InternalServerErrorException('Create token failed.');
    }
  }
}
