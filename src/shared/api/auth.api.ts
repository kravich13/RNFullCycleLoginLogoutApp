import {
  ILoginRequest,
  IRefreshTokenRequest,
  IRefreshTokenResponse,
  IUserDataResponse,
} from '../types';

const API_URL = 'https://dummyjson.com/';

export const loginRequest = async (data: ILoginRequest): Promise<IUserDataResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to login');
  }

  return response.json();
};

export const getCurrentUserRequest = async (accessToken: string): Promise<IUserDataResponse> => {
  const response = await fetch(`${API_URL}/auth/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to get current user');
  }

  return response.json();
};

export const refreshTokenRequest = async (
  data: IRefreshTokenRequest,
): Promise<IRefreshTokenResponse> => {
  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  return response.json();
};
