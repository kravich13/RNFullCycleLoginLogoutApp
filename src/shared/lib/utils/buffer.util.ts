import { Buffer } from 'buffer';

interface IJwtPayload {
  exp: number;
  iat: number;
}

export const getPayloadFromToken = (token: string): IJwtPayload | null => {
  try {
    const parts = token
      .split('.')
      .map(part => Buffer.from(part.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString());

    return JSON.parse(parts[1]) as IJwtPayload;
  } catch (error) {
    console.error(error);
    return null;
  }
};
