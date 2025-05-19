import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from '@wearepush/screens/profile';
import { EAuthRoutes } from '@wearepush/shared/enums';
import { AuthStackParamList } from '@wearepush/shared/types';
import React from 'react';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={EAuthRoutes.Profile} screenOptions={{ headerShown: true }}>
      <Stack.Screen name={EAuthRoutes.Profile} component={ProfileScreen} />
    </Stack.Navigator>
  );
};
