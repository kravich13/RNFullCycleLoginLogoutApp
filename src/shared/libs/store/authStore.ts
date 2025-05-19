import { create } from 'zustand';
import { IAuthStoreInitialState, IAuthStore } from '../../types';

const initialState: IAuthStoreInitialState = {
  id: -1,
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  gender: '',
  image: '',
  accessToken: '',
};

export const useAuthStore = create<IAuthStore>(set => ({
  ...initialState,
  setUser: user => set({ ...user, isAuth: true }),
  setNotAuth: () => set({ isAuth: false }),
  clearUser: () => set({ isAuth: false, ...initialState }),
}));
