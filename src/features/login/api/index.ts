import {
  ILoginDataResponse,
  ILoginRequest,
  IRefreshTokenRequest,
  IRefreshTokenResponse,
} from '../types';

const API_URL = 'https://dummyjson.com';

export const loginRequest = async (data: ILoginRequest): Promise<ILoginDataResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    let errorMessage = 'Failed to login';

    try {
      const errorData = await response.json();

      if (errorData?.message) {
        errorMessage = errorData.message;
      }
    } finally {
      throw new Error(errorMessage);
    }
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
