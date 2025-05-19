export type IAuthStoreInitialState = Pick<
  IAuthStore,
  'id' | 'username' | 'email' | 'firstName' | 'lastName' | 'gender' | 'image' | 'accessToken'
>;

export interface IAuthStore {
  isAuth?: boolean;
  id: number | null;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;

  setUser: (user: IAuthStoreInitialState) => void;
  setNotAuth: () => void;
  clearUser: () => void;
}
