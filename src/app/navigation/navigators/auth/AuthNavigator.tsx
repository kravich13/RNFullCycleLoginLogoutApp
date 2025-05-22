import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useQueryClient } from '@tanstack/react-query';
import { useSessionStoreValue } from '@wearepush/features/login';
import { ProfileScreen } from '@wearepush/screens/profile';
import { getCurrentUserRequest } from '@wearepush/shared/api';
import { EAuthRoutes, EReactQueryKeys } from '@wearepush/shared/enums';
import { AuthStackParamList } from '@wearepush/shared/types';
import React, { useEffect } from 'react';
import { AppState } from 'react-native';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  const queryClient = useQueryClient();

  const accessToken = useSessionStoreValue('accessToken');

  useEffect(() => {
    const subscription = AppState.addEventListener('change', async nextAppState => {
      if (nextAppState === 'active') {
        if (!accessToken) return;

        queryClient.fetchQuery({
          queryKey: [EReactQueryKeys.CurrentUserData],
          queryFn: () => getCurrentUserRequest(accessToken),
        });
      }
    });

    return () => subscription.remove();
  }, [accessToken, queryClient]);

  return (
    <Stack.Navigator initialRouteName={EAuthRoutes.Profile} screenOptions={{ headerShown: true }}>
      <Stack.Screen name={EAuthRoutes.Profile} component={ProfileScreen} />
    </Stack.Navigator>
  );
};
