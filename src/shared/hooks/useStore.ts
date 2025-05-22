import { useUserStore } from '../store';
import { IUserStore } from '../types';

export const useUserStoreValue = <T extends keyof IUserStore>(key: T): IUserStore[T] =>
  useUserStore(state => state[key]);
