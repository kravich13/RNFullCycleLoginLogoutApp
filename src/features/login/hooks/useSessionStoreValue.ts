import { useSessionStore } from '../store';
import { ISessionStore } from '../types';

export const useSessionStoreValue = <T extends keyof ISessionStore>(key: T): ISessionStore[T] =>
  useSessionStore(state => state[key]);
