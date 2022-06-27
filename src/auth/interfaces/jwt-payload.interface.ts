export interface JwtPayload {
  email: string;
  userId: string;
  iat: number;
  exp: number;
}
