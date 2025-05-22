import { useQueryClient } from '@tanstack/react-query';
import { useSessionStoreValue } from '@wearepush/features/login';
import { Colors, Fonts } from '@wearepush/shared/consts';
import { EAuthRoutes, EReactQueryKeys } from '@wearepush/shared/enums';
import { useUserStoreValue } from '@wearepush/shared/hooks';
import { AuthStackScreenProps } from '@wearepush/shared/types';
import React, { useCallback, useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Keychain from 'react-native-keychain';
export const ProfileScreen: React.FC<AuthStackScreenProps<EAuthRoutes.Profile>> = ({
  navigation,
}) => {
  const firstName = useUserStoreValue('firstName');
  const lastName = useUserStoreValue('lastName');
  const clearUser = useUserStoreValue('clearUser');
  const setNotAuth = useSessionStoreValue('setNotAuth');

  const queryClient = useQueryClient();

  useLayoutEffect(() => {
    if (!firstName || !lastName) return;

    navigation.setOptions({
      title: `Hi, ${firstName} ${lastName}!`,
    });
  }, [firstName, lastName, navigation]);

  const handleLogout = useCallback(async () => {
    await Keychain.resetGenericPassword();
    queryClient.removeQueries({ queryKey: [EReactQueryKeys.CurrentUserData] });
    clearUser();
    setNotAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryClient]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },

  logoutButton: {
    width: '100%',
    height: 40,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutButtonText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    fontFamily: Fonts.NotoSans,
    color: Colors.primaryBlack,
  },
});
