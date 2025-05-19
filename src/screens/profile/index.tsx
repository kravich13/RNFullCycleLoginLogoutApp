import { useQueryClient } from '@tanstack/react-query';
import { Colors, Fonts } from '@wearepush/shared/consts';
import { EAuthRoutes } from '@wearepush/shared/enums';
import { AuthStackScreenProps, IUserDataResponse } from '@wearepush/shared/types';
import React, { useCallback, useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const ProfileScreen: React.FC<AuthStackScreenProps<EAuthRoutes.Profile>> = ({
  navigation,
}) => {
  const queryClient = useQueryClient();
  const authData = queryClient.getQueryData<IUserDataResponse>(['currentUserData']);

  useLayoutEffect(() => {
    if (!authData) return;

    navigation.setOptions({
      title: authData?.username,
    });
  }, [authData, navigation]);

  const handleLogout = useCallback(() => {
    queryClient.removeQueries({ queryKey: ['currentUserData'] });
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
