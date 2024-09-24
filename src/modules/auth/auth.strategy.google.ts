import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthServiceUser } from './auth.interface';
import { Profile } from 'passport';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: `${process.env.PUBLIC_API_URL}/api/auth/google-redirect`,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ) {
    const { name, emails, photos, provider } = profile;
    const user: AuthServiceUser = {
      email: emails?.[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos?.[0].value,
      provider,
    };
    done(null, user);
  }
}
