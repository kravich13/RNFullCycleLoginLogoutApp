export interface ILoginRequest {
  username: string;
  password: string;
  expiresInMins: number;
}

export interface IRefreshTokenRequest {
  refreshToken: string;
  expiresInMins: number;
}

export interface ILoginDataResponse {
  id?: number;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  image?: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface IRefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}
