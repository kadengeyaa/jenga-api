export interface AuthOptions {
  merchantCode: string;
  consumerSecret: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: Date;
  issuedAt: Date;
  tokenType: 'Bearer';
}
