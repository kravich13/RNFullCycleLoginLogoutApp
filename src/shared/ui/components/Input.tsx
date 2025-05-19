import { Colors, Fonts } from '@wearepush/shared/consts';
import React, { memo, useCallback, useRef, useState } from 'react';
import {
  Animated,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
} from 'react-native';
import { useInputAnimatedStyles } from '../hooks';

const AnimatedInput = Animated.createAnimatedComponent(TextInput);

interface InputProps {
  inputProps?: Omit<TextInputProps, 'placeholder'>;
  placeholder: string;
  activePlaceholder: string;
  error?: boolean;
}

export const Input: React.FC<InputProps> = memo(
  ({ activePlaceholder, placeholder, inputProps, error = false }) => {
    const { value, onFocus, onBlur, style: inputStyle, ...restInputProps } = inputProps || {};

    const inputRef = useRef<TextInput>(null);

    const [focused, setFocused] = useState(false);

    const hasValueAndUnfocused = value && !focused;

    const { labelStyle, animatedInputStyle } = useInputAnimatedStyles({
      value,
      error,
      focused,
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
            animatedInputStyle,
            error && { borderColor: Colors.primaryRed },
            error && !focused && { color: Colors.primaryRed },
          ]}
          value={value}
          selectionColor={Colors.primaryBlue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          clearButtonMode="while-editing"
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
});
