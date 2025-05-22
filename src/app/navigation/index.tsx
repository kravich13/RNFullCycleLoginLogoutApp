import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IKeychainLoginDataCredentials, useSessionStoreValue } from '@wearepush/features/login';
import { Colors } from '@wearepush/shared/consts';
import { useUserStoreValue } from '@wearepush/shared/hooks';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { AuthNavigator, NotAuthNavigator } from './navigators';

const RootStack = createNativeStackNavigator();

export const Navigation = () => {
  const isAuth = useSessionStoreValue('isAuth');
  const setAuth = useSessionStoreValue('setAuth');
  const setNotAuth = useSessionStoreValue('setNotAuth');
  const setUser = useUserStoreValue('setUser');
  const clearUser = useUserStoreValue('clearUser');

  useEffect(() => {
    (async () => {
      const credentials = await Keychain.getGenericPassword();

      if (credentials) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { refreshToken, accessToken, ...userData } = JSON.parse(
            credentials.password,
          ) as IKeychainLoginDataCredentials;

          setAuth(accessToken, refreshToken);
          setUser(userData);
        } catch (e) {
          setNotAuth();
          clearUser();
        }
      } else {
        console.log('no credentials');
        setNotAuth();
        clearUser();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isAuth === undefined) {
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
