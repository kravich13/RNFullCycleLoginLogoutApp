import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Navigation } from '../navigation';
import { ErrorBoundary } from './ErrorBoundary';

export function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.lighter} />

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
