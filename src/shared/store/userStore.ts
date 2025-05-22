import { create } from 'zustand';
import { IUserStore, IUserStoreInitialState } from '../types';

const initialState: IUserStoreInitialState = {
  id: -1,
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  gender: '',
  image: '',
};

export const useUserStore = create<IUserStore>(set => ({
  ...initialState,
  setUser: user => set({ ...user }),
  clearUser: () => set({ ...initialState }),
}));
