import { GradientButton, Input } from '@wearepush/shared/ui';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';

export const LoginForm = memo(() => {
  return (
    <>
      <View style={[styles.inputContainer, styles.firstInputContainer]}>
        <Input placeholder="Enter username" activePlaceholder="Username" />
      </View>

      <View style={styles.inputContainer}>
        <Input placeholder="Enter password" activePlaceholder="Password" />
      </View>

      <GradientButton
        title="Login"
        fullWidth
        style={styles.gradientButton}
        disabled
        onPress={() => {}}
      />
    </>
  );
});

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
  },

  firstInputContainer: {
    marginBottom: 12,
  },

  gradientButton: {
    marginTop: 16,
  },
});
