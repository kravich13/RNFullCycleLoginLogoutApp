import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EAuthRoutes } from '@wearepush/shared/enums';

export type AuthStackParamList = {
  [EAuthRoutes.Profile]: undefined;
};

export type AuthStackScreenProps<Screen extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  Screen
>;
