import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSessionStoreValue } from '@wearepush/features/login';
import { ProfileScreen } from '@wearepush/screens/profile';
import { EAuthRoutes } from '@wearepush/shared/enums';
import { useUserStoreValue } from '@wearepush/shared/hooks';
import { getPayloadFromToken } from '@wearepush/shared/lib';
import { AuthStackParamList } from '@wearepush/shared/types';
import React, { useEffect } from 'react';
import { AppState } from 'react-native';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  const accessToken = useSessionStoreValue('accessToken');
  const setNotAuth = useSessionStoreValue('setNotAuth');
  const clearUser = useUserStoreValue('clearUser');

  useEffect(() => {
    const subscription = AppState.addEventListener('change', async nextAppState => {
      if (nextAppState === 'active') {
        if (!accessToken) return;

        const payload = getPayloadFromToken(accessToken);

        if (!payload) {
          setNotAuth();
          clearUser();
          return;
        }

        const { exp } = payload;

        if (exp < Date.now() / 1000) {
          setNotAuth();
          clearUser();
        }
      }
    });

    return () => subscription.remove();
  }, [accessToken]);

  return (
    <Stack.Navigator initialRouteName={EAuthRoutes.Profile} screenOptions={{ headerShown: true }}>
      <Stack.Screen name={EAuthRoutes.Profile} component={ProfileScreen} />
    </Stack.Navigator>
  );
};
