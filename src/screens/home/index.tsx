import { ENotAuthRoutes } from '@wearepush/shared/enums';
import { NotAuthStackScreenProps } from '@wearepush/shared/types';
import { GradientButton } from '@wearepush/shared/ui';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const HomeScreen: React.FC<NotAuthStackScreenProps<ENotAuthRoutes.Home>> = ({
  navigation,
}) => {
  const goToLogin = useCallback(() => {
    navigation.navigate(ENotAuthRoutes.LogIn);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <GradientButton title="Go to login" fullWidth onPress={goToLogin} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },

  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
