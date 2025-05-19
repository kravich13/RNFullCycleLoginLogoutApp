import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, LoginScreen } from '@wearepush/screens';
import { ENotAuthRoutes } from '@wearepush/shared/enums';
import { NotAuthStackParamList } from '@wearepush/shared/types';
import React from 'react';

const Stack = createNativeStackNavigator<NotAuthStackParamList>();

export const NotAuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ENotAuthRoutes.Home} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ENotAuthRoutes.Home} component={HomeScreen} />
      <Stack.Screen name={ENotAuthRoutes.LogIn} component={LoginScreen} />
    </Stack.Navigator>
  );
};
