export interface AuthServiceUser {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
}

export interface JwtPayload {
  email: string;
}
