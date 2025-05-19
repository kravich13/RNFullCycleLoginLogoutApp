import { Colors, Fonts } from '@wearepush/shared/consts';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
} from 'react-native';

const AnimatedInput = Animated.createAnimatedComponent(TextInput);

interface InputProps {
  inputProps?: Omit<TextInputProps, 'placeholder'>;
  placeholder: string;
  activePlaceholder: string;
  error?: string;
}

export const Input: React.FC<InputProps> = memo(
  ({ activePlaceholder, placeholder, inputProps }) => {
    const { value, onFocus, onBlur, style: inputStyle, ...restInputProps } = inputProps || {};

    const animated = useRef(new Animated.Value(value ? 1 : 0)).current;
    const inputRef = useRef<TextInput>(null);

    const [focused, setFocused] = useState(false);

    const hasValueAndUnfocused = value && !focused;

    useEffect(() => {
      Animated.timing(animated, {
        toValue: focused ? 1 : 0,
        duration: 180,
        useNativeDriver: false,
      }).start();
    }, [focused, animated]);

    const labelStyle = {
      top: animated.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 6],
      }),
      fontSize: animated.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 12],
      }),
      color: animated.interpolate({
        inputRange: [0, 1],
        outputRange: [Colors.placeholderGray, Colors.primaryBlue],
      }),
    };

    const animatedInputFontSize = animated.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    });

    const handlePlaceholderPress = useCallback(() => {
      inputRef.current?.focus();
    }, []);

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
        {!hasValueAndUnfocused && (
          <Animated.Text
            style={[styles.labelStyle, labelStyle]}
            pointerEvents="none"
            onPress={handlePlaceholderPress}
          >
            {focused || hasValueAndUnfocused ? activePlaceholder : placeholder}
          </Animated.Text>
        )}

        <AnimatedInput
          ref={inputRef}
          style={[
            styles.input,
            inputStyle,
            focused && styles.inputFocused,
            { fontSize: animatedInputFontSize },
          ]}
          value={value}
          selectionColor={Colors.primaryBlue}
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
    fontWeight: '400',

    paddingTop: 24,
    paddingBottom: 8,
  },

  labelStyle: {
    position: 'absolute',
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
