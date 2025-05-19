import { Colors, Fonts } from '@wearepush/shared/consts';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
} from 'react-native';

interface InputProps {
  inputProps?: Omit<TextInputProps, 'placeholder'>;
  placeholder: string;
  activePlaceholder: string;
}

export const Input: React.FC<InputProps> = memo(
  ({ activePlaceholder, placeholder, inputProps }) => {
    const { value, onFocus, onBlur, style: inputStyle, ...restInputProps } = inputProps || {};

    const animated = useRef(new Animated.Value(value ? 1 : 0)).current;

    const [focused, setFocused] = useState(false);

    useEffect(() => {
      Animated.timing(animated, {
        toValue: focused || value ? 1 : 0,
        duration: 180,
        useNativeDriver: false,
      }).start();
    }, [focused, value, animated]);

    const labelStyle = useMemo(
      () => ({
        top: animated.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 4],
        }),
        fontSize: animated.interpolate({
          inputRange: [0, 1],
          outputRange: [16, 12],
        }),
        color: animated.interpolate({
          inputRange: [0, 1],
          outputRange: [Colors.placeholderGray, Colors.primaryBlue],
        }),
      }),
      [animated],
    );

    const handleFocus = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(true);
        onFocus?.(e);
      },
      [onFocus],
    );

    const handleBlur = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(false);
        onBlur?.(e);
      },
      [onBlur],
    );

    return (
      <View style={styles.wrapper}>
        <Animated.Text style={[styles.labelStyle, labelStyle]} pointerEvents="none">
          {focused || value ? activePlaceholder : placeholder}
        </Animated.Text>

        <TextInput
          style={[styles.input, focused && styles.inputFocused, inputStyle]}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...restInputProps}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    width: '100%',
  },

  input: {
    backgroundColor: 'white',

    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 8,

    paddingHorizontal: 16,
    width: '100%',

    height: 53,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '400',
  },

  labelStyle: {
    backgroundColor: 'white',
    position: 'absolute' as const,
    zIndex: 1,
    left: 16,
    fontFamily: Fonts.NotoSans,
    lineHeight: 22,
    fontWeight: '400',
  },

  inputFocused: {
    borderColor: Colors.primaryBlue,
  },
});
