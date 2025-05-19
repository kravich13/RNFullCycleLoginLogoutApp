import { useMutation } from '@tanstack/react-query';
import { ILoginFormValues, LoginForm } from '@wearepush/entities/login';
import { loginRequest } from '@wearepush/shared/api';
import { useAuthStoreValue } from '@wearepush/shared/libs';
import { ErrorBanner, GradientButton } from '@wearepush/shared/ui';
import { useFormik } from 'formik';
import React, { useCallback, useState } from 'react';
import { Dimensions, LayoutChangeEvent, ScrollView, StyleSheet, View } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

const { height: screenHeight } = Dimensions.get('window');

const loginSchema = z.object({
  userName: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export const LoginScreen = () => {
  const [formHeight, setFormHeight] = useState<number | null>(null);
  const [errorBannerMessage, setErrorBannerMessage] = useState<string | null>(null);

  const setUser = useAuthStoreValue('setUser');

  const handleFormLayout = useCallback(
    (e: LayoutChangeEvent) => {
      if (formHeight === null) {
        setFormHeight(e.nativeEvent.layout.height);
      }
    },
    [formHeight],
  );

  const { mutate: login, isPending } = useMutation({
    mutationFn: (values: ILoginFormValues) =>
      loginRequest({
        username: values.userName,
        password: values.password,
        expiresInMins: 1,
      }),
    onError: error => {
      setErrorBannerMessage(error.message);
    },
    onSuccess: async data => {
      await Keychain.setGenericPassword('currentUserData', JSON.stringify(data));
      setUser(data);
    },
  });

  const paddingTop = formHeight !== null ? Math.max((screenHeight - formHeight) / 2, 0) : 0;

  const { values, errors, touched, isValid, handleBlur, handleChange, handleSubmit } =
    useFormik<ILoginFormValues>({
      initialValues: {
        userName: 'emilys',
        password: 'emilyspass',
      },
      validate: values => {
        const result = loginSchema.safeParse(values);
        const validateErros: Record<string, string> = {};

        if (!result.success) {
          result.error.errors.forEach((err: z.ZodIssue) => {
            const firstError = err.path.at(0);

            if (firstError) {
              validateErros[firstError] = err.message;
            }
          });
        }

        return validateErros;
      },
      onSubmit: values => {
        login(values);
      },
    });

  const onSubmit = useCallback(() => {
    handleSubmit();
  }, [handleSubmit]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer} onLayout={handleFormLayout}>
          <LoginForm
            values={values}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            setErrorBannerMessage={setErrorBannerMessage}
          />

          {errorBannerMessage && (
            <ErrorBanner message={errorBannerMessage} containerStyle={styles.errorBanner} />
          )}

          <GradientButton
            title="Login"
            fullWidth
            style={styles.gradientButton}
            disabled={!isValid || isPending || !touched}
            onPress={onSubmit}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    minHeight: '100%',
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  formContainer: {
    width: '100%',
    maxWidth: 400,
  },

  errorBanner: {
    marginTop: 13,
  },

  gradientButton: {
    marginTop: 14,
  },
});
