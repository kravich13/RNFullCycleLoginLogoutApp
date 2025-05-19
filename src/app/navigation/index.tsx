import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUserRequest } from '@wearepush/shared/api';
import { Colors } from '@wearepush/shared/consts';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AuthNavigator, NotAuthNavigator } from './navigators';

const RootStack = createNativeStackNavigator();

export const Navigation = () => {
  const accessToken = '';

  const { data, isLoading } = useQuery({
    queryKey: ['currentUserData'],
    queryFn: () => getCurrentUserRequest(accessToken),
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.primaryBlue} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {data ? (
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
