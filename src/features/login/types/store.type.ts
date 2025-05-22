export interface ISessionStore {
  isAuth?: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (accessToken: string, refreshToken: string) => void;
  setNotAuth: () => void;
}

export type ISessionStoreInitialState = Pick<
  ISessionStore,
  'isAuth' | 'accessToken' | 'refreshToken'
>;
