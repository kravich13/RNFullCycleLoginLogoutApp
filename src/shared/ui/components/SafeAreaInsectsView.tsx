import React, { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const SafeAreaInsectsView: React.FC<PropsWithChildren> = ({ children }) => {
  const { bottom, left, right } = useSafeAreaInsets();

  return (
    <View
      style={[styles.container, { paddingBottom: bottom, paddingLeft: left, paddingRight: right }]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
