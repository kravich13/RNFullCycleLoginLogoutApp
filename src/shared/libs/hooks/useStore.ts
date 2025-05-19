import { IAuthStore } from '../../types';
import { useAuthStore } from '../store';

export const useAuthStoreValue = <T extends keyof IAuthStore>(key: T): IAuthStore[T] =>
  useAuthStore(state => state[key]);
