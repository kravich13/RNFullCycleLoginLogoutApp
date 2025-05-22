export type IUserStoreInitialState = Pick<
  IUserStore,
  'id' | 'username' | 'email' | 'firstName' | 'lastName' | 'gender' | 'imageUrl'
>;

export interface IUserStore {
  id: number | null;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  imageUrl: string;

  setUser: (user: IUserStoreInitialState) => void;
  clearUser: () => void;
}
