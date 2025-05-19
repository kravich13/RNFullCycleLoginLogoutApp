import { Colors } from '@wearepush/shared/consts';
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

interface UseInputAnimatedStylesProps {
  value?: string;
  error?: boolean;
  focused: boolean;
}

export const useInputAnimatedStyles = ({ value, error, focused }: UseInputAnimatedStylesProps) => {
  const animated = useRef(new Animated.Value(value ? 1 : 0)).current;
  const animatedColorState = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animations = [];

    animations.push(
      Animated.timing(animated, {
        toValue: focused ? 1 : 0,
        duration: 180,
        useNativeDriver: false,
      }),
    );

    const colorToValue = error ? 2 : focused || value ? 1 : 0;

    animations.push(
      Animated.timing(animatedColorState, {
        toValue: colorToValue,
        duration: 180,
        useNativeDriver: false,
      }),
    );

    Animated.parallel(animations).start();
  }, [focused, error, value, animated, animatedColorState]);

  const labelStyle = {
    top: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 6],
    }),
    fontSize: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedColorState.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [Colors.placeholderGray, Colors.primaryBlue, Colors.primaryRed],
    }),
  };

  const animatedInputStyle = {
    borderColor: animatedColorState.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [Colors.border, Colors.primaryBlue, Colors.primaryRed],
    }),
    color: animatedColorState.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [Colors.primaryBlack, Colors.primaryBlack, Colors.primaryRed],
    }),
    fontSize: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    paddingTop: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [4, 12],
    }),
  };

  return { labelStyle, animatedInputStyle };
};
