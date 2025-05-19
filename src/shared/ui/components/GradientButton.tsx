import { Colors, Fonts } from '@wearepush/shared/consts';
import { memo } from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface GradientButtonProps {
  title: string;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

export const GradientButton = memo(
  ({ title, disabled, fullWidth = false, style, onPress }: GradientButtonProps) => {
    return (
      <TouchableOpacity
        style={[
          styles.button,
          fullWidth && styles.fullWidthButton,
          style,
          disabled && styles.disabled,
        ]}
        disabled={disabled}
        onPress={onPress}
      >
        <LinearGradient
          start={{ x: 0, y: 0.2 }}
          end={{ x: 1, y: 0.8 }}
          colors={[Colors.primaryBlue, Colors.primaryLightBlue]}
          locations={[0.0757, 0.9243]}
          style={[styles.gradient]}
        >
          <View style={styles.content}>
            <Text style={styles.text}>{title}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    shadowColor: Colors.primaryBlue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },

  disabled: {
    opacity: 0.32,
  },

  gradient: {
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidthButton: {
    width: '100%',
  },

  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
    fontFamily: Fonts.NotoSans,
  },
});
