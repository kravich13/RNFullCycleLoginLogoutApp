import { create } from 'zustand';
import { ISessionStore, ISessionStoreInitialState } from '../types';

const initialState: ISessionStoreInitialState = {
  accessToken: null,
  refreshToken: null,
};

export const useSessionStore = create<ISessionStore>(set => ({
  ...initialState,

  setAuth: token => set({ isAuth: true, accessToken: token }),
  setNotAuth: () => set({ ...initialState }),
}));
