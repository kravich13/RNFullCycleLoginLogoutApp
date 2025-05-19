import { Colors, Fonts } from '@wearepush/shared/consts';
import { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface GradientButtonProps {
  title: string;
  disabled?: boolean;
  fullWidth?: boolean;
  onPress: () => void;
}

export const GradientButton = memo(
  ({ title, disabled, onPress, fullWidth = false }: GradientButtonProps) => {
    return (
      <TouchableOpacity
        style={[styles.button, fullWidth && styles.fullWidthButton]}
        disabled={disabled}
        onPress={onPress}
      >
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={[Colors.primaryLightBlue, Colors.primaryBlue]}
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
