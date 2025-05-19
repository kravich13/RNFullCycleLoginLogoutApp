import { Colors, Fonts } from '@wearepush/shared/consts';
import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface ErrorBannerProps {
  message: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ message, containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View>
        <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <Path
            d="M9.82 18.64C12.2556 18.64 14.4606 17.6528 16.0567 16.0567C17.6528 14.4606 18.64 12.2556 18.64 9.82C18.64 7.38444 17.6528 5.17944 16.0567 3.58332C14.4606 1.98721 12.2556 1 9.82 1C7.38444 1 5.17944 1.98721 3.58332 3.58332C1.98721 5.17944 1 7.38444 1 9.82C1 12.2556 1.98721 14.4606 3.58332 16.0567C5.17944 17.6528 7.38444 18.64 9.82 18.64Z"
            stroke="white"
            stroke-width="1.96"
            stroke-linejoin="round"
          />
          <Path
            d="M9.81982 13.0446C10.2478 13.0446 10.5952 13.392 10.5952 13.82C10.5952 14.248 10.2478 14.5954 9.81982 14.5954C9.39181 14.5954 9.04443 14.248 9.04443 13.82C9.04443 13.392 9.39181 13.0446 9.81982 13.0446Z"
            fill={Colors.primaryBlack}
            stroke="white"
            stroke-width="0.45"
          />
          <Path
            d="M9.81982 5.82001L9.81982 10.82"
            stroke="white"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </Svg>
      </View>

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
    gap: 10,
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
