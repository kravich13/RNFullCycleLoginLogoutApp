import { create } from 'zustand';
import { ISessionStore, ISessionStoreInitialState } from '../types';

const initialState: ISessionStoreInitialState = {
  accessToken: null,
  refreshToken: null,
};

export const useSessionStore = create<ISessionStore>(set => ({
  ...initialState,

  setAuth: (accessToken: string, refreshToken: string) =>
    set({ isAuth: true, accessToken, refreshToken }),
  setNotAuth: () => set({ ...initialState, isAuth: false }),
}));
