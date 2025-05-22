export type IUserStoreInitialState = Pick<
  IUserStore,
  'id' | 'username' | 'email' | 'firstName' | 'lastName' | 'gender' | 'image'
>;

export interface IUserStore {
  id: number | null;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;

  setUser: (user: IUserStoreInitialState) => void;
  clearUser: () => void;
}
