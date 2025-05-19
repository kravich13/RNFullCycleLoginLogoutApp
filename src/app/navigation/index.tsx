import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AuthNavigator, NotAuthNavigator } from './navigators';

const RootStack = createNativeStackNavigator();

export const Navigation = () => {
  const isAuth = false;

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
