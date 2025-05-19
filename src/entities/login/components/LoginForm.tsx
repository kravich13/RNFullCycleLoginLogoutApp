import { Colors } from '@wearepush/shared/consts';
import { IHandleFormikChange } from '@wearepush/shared/types';
import { Input } from '@wearepush/shared/ui';
import { FormikErrors, FormikTouched } from 'formik';
import React, { memo } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputFocusEventData,
  View,
} from 'react-native';
import { ILoginFormValues } from '../types';

type FormikHandleBlurType = (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;

interface LoginFormProps extends IHandleFormikChange<keyof ILoginFormValues> {
  values: ILoginFormValues;
  errors: FormikErrors<ILoginFormValues>;
  touched: FormikTouched<ILoginFormValues>;
  handleBlur: (field: keyof ILoginFormValues) => void;
}

export const LoginForm = memo(
  ({ values, handleChange, errors, touched, handleBlur }: LoginFormProps) => {
    return (
      <>
        <View style={[styles.inputContainer, styles.firstInputContainer]}>
          <Input
            placeholder="Enter username"
            activePlaceholder="Username"
            error={Boolean(errors.userName)}
            inputProps={{
              value: values.userName,
              onChangeText: handleChange('userName'),
              onBlur: handleBlur('userName') as unknown as FormikHandleBlurType,
            }}
          />

          {errors.userName && touched.userName && (
            <Text style={styles.errorText}>{errors.userName}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Input
            placeholder="Enter password"
            activePlaceholder="Password"
            error={Boolean(errors.password)}
            inputProps={{
              value: values.password,
              onChangeText: handleChange('password'),
              onBlur: handleBlur('password') as unknown as FormikHandleBlurType,
            }}
          />

          {errors.password && touched.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
        </View>
      </>
    );
  },
);

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
  },

  firstInputContainer: {
    marginBottom: 12,
  },

  errorText: {
    color: Colors.primaryRed,
    fontSize: 12,
    marginTop: 4,
  },
});
