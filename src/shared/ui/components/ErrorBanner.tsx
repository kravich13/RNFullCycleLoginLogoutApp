import { Colors, Fonts } from '@wearepush/shared/consts';
import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

interface ErrorBannerProps {
  message: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ message, containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: Colors.primaryRed,
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 53,
    borderWidth: 1,
    borderColor: 'white',
  },

  icon: {
    color: 'white',
    fontSize: 32,
    marginRight: 16,
  },

  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 22,
    fontFamily: Fonts.NotoSans,
  },
});
