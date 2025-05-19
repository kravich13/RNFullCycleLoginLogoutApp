import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ENotAuthRoutes } from '@wearepush/shared/enums';

export type NotAuthStackParamList = {
  [ENotAuthRoutes.LogIn]: undefined;
  [ENotAuthRoutes.Home]: undefined;
};

export type NotAuthStackScreenProps<Screen extends keyof NotAuthStackParamList> =
  NativeStackScreenProps<NotAuthStackParamList, Screen>;
