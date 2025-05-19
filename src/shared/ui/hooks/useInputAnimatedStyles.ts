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
    Animated.timing(animated, {
      toValue: focused ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [focused, animated]);

  useEffect(() => {
    let toValue = 0;

    if (error) {
      toValue = 2;
    } else if (focused || value) {
      toValue = 1;
    }

    Animated.timing(animatedColorState, {
      toValue,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [error, focused, value, animatedColorState]);

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
      outputRange: ['#101828', '#101828', Colors.primaryRed],
    }),
  };

  return { labelStyle, animatedInputStyle };
};
