import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { useSessionStoreValue } from '@wearepush/features/login';
import { getCurrentUserRequest } from '@wearepush/shared/api';
import { Colors } from '@wearepush/shared/consts';
import { EReactQueryKeys } from '@wearepush/shared/enums';
import { useUserStoreValue } from '@wearepush/shared/hooks';
import { IUserDataResponse } from '@wearepush/shared/types';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { AuthNavigator, NotAuthNavigator } from './navigators';

const RootStack = createNativeStackNavigator();

export const Navigation = () => {
  const isAuth = useSessionStoreValue('isAuth');
  const accessToken = useSessionStoreValue('accessToken');
  const setNotAuth = useSessionStoreValue('setNotAuth');
  const setUser = useUserStoreValue('setUser');
  const clearUser = useUserStoreValue('clearUser');

  const { isLoading, error } = useQuery<IUserDataResponse, Error>({
    queryKey: [EReactQueryKeys.CurrentUserData],
    queryFn: () => getCurrentUserRequest(accessToken || ''),
    enabled: Boolean(accessToken) && isAuth === false,
    retry: false,
  });

  useEffect(() => {
    if (error) {
      (async () => {
        await Keychain.resetGenericPassword();
        setNotAuth();
        clearUser();
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    (async () => {
      const credentials = await Keychain.getGenericPassword();

      if (credentials) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { refreshToken, ...userData } = JSON.parse(
            credentials.password,
          ) as IUserDataResponse;

          setUser(userData);
        } catch (e) {
          setNotAuth();
          clearUser();
        }
      } else {
        setNotAuth();
        clearUser();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading || isAuth === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.primaryBlue} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuth ? (
          <RootStack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{
              animationTypeForReplace: 'push',
            }}
          />
        ) : (
          <RootStack.Screen
            name="NotAuth"
            component={NotAuthNavigator}
            options={{
              animationTypeForReplace: 'pop',
            }}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
