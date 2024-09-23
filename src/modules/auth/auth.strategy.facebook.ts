import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile } from 'passport';
import { Strategy } from 'passport-facebook';
import { AuthServiceUser } from './auth.interface';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: `${process.env.PUBLIC_API_URL}/api/auth/facebook-redirect`,
      scope: 'email',
      profileFields: ['emails', 'photos', 'name'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void
  ) {
    const { name, emails, photos } = profile;
    const user: AuthServiceUser = {
      email: emails?.[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos?.[0].value,
    };
    done(null, user);
  }
}
