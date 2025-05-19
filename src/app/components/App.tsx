import { Colors } from '@wearepush/shared/consts';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from '../navigation';
import { ErrorBoundary } from './ErrorBoundary';

export function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

        <ErrorBoundary>
          <Navigation />
        </ErrorBoundary>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
