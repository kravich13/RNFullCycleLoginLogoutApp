import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Colors } from '@wearepush/shared/consts';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ErrorBoundary } from './components';
import { Navigation } from './navigation';

const queryClient = new QueryClient();

export function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <Navigation />
          </QueryClientProvider>
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
