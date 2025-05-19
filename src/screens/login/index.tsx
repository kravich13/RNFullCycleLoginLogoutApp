import { LoginForm } from '@wearepush/entities/login';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <LoginForm />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
});
