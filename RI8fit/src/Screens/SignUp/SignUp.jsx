/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useState } from 'react';
import { VStack, FormControl, Text, Box, ScrollView } from 'native-base';
import {
  TextInput,
  Button,
  PaperProvider,
  MD3LightTheme,
  MD3DarkTheme,
} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  Alert,
  StyleSheet,
  useWindowDimensions,
  useColorScheme,
  View,
} from 'react-native';
import api from '../../API/api';
import {
  setItem,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  AUTH_DETAILS,
} from '../../Utils/helper';
import { UserContext } from '../../Context/UserContext';

const SignUp = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const wp = p => (width * p) / 100;
  const hp = p => (height * p) / 100;

  const theme = {
    ...(isDarkMode ? MD3DarkTheme : MD3LightTheme),
    colors: {
      ...(isDarkMode ? MD3DarkTheme.colors : MD3LightTheme.colors),
      primary: '#3B82F6',
      text: isDarkMode ? '#F3F4F6' : '#111827',
      placeholder: isDarkMode ? '#9CA3AF' : '#6B7280',
      background: isDarkMode ? '#374151' : '#FFFFFF',
    },
  };

  const { email, setEmail, phone, setPhone } = useContext(UserContext);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountCreated, setAccountCreated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isInvalidEmail = email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isInvalidPhone = phone && !/^\d{10}$/.test(phone);
  const isPasswordMismatch =
    password && confirmPassword && password !== confirmPassword;

  const validateForm = () => {
    if (!email.trim() || isInvalidEmail) return 'Valid email is required';
    if (!phone.trim() || isInvalidPhone)
      return 'Valid 10-digit phone number is required';
    if (!password.trim() || password.length < 6)
      return 'Password must be at least 6 characters';
    if (isPasswordMismatch) return 'Passwords do not match';
    return null;
  };

  const handleSubmit = async () => {
    const error = validateForm();
    if (error) {
      Alert.alert('Validation Error', error);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.post('/auth/candidate/signup', null, {
        params: {
          email,
          password,
          confirm_password: confirmPassword,
          phone_no: phone,
        },
      });

      if (response.data.status === 200 || response.data.success === true) {
        const { access_token, refresh_token } = response.data || {};

        // ✅ Store tokens in storage
        await setItem(ACCESS_TOKEN, access_token);
        await setItem(REFRESH_TOKEN, refresh_token);
        await setItem(AUTH_DETAILS, JSON.stringify(response.data));

        setAccountCreated(true);

        setTimeout(() => {
          setAccountCreated(false);
          // setEmail('');
          // setPhone('');
          setPassword('Akshay');
          setConfirmPassword('Akshay');

          navigation.navigate('VerifyOTP', {
            token: access_token,
          });
        }, 500);
      } else {
        Alert.alert('Error', response.data.message || 'Something went wrong');
      }
    } catch (error) {
      if (error.response?.status === 400) {
        Alert.alert('Error', 'Email already exists. Please try another.');
      } else {
        Alert.alert(
          'Error',
          error.response?.data?.message ||
            'Failed to create account. Please try again.',
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PaperProvider theme={theme}>
      <View
        style={{
          flex: 1,
          backgroundColor: isDarkMode ? '#111827' : '#F3F4F6',
        }}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: hp(5) }}>
          <Box
            borderRadius="2xl"
            shadow={4}
            p={5}
            m={4}
            mt={4}
            mb={hp(2)}
            bg={isDarkMode ? '#1F2937' : '#FFFFFF'}
            style={styles.box}
          >
            <Text
              fontSize={24}
              fontWeight="bold"
              mb={4}
              color={isDarkMode ? '#F3F4F6' : '#111827'}
            >
              Employee Sign Up
            </Text>

            <VStack space={hp(2)}>
              {/* Email Field */}
              <FormControl isRequired>
                <FormControl.Label>Email Address</FormControl.Label>
                <TextInput
                  mode="outlined"
                  placeholder="Enter email"
                  value={email}
                  keyboardType="email-address"
                  onChangeText={setEmail}
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <MaterialIcons
                          name="email"
                          size={20}
                          color={isDarkMode ? '#F3F4F6' : '#111827'}
                        />
                      )}
                    />
                  }
                  style={styles.textInput}
                />
              </FormControl>

              {/* Phone Number */}
              <FormControl isRequired>
                <FormControl.Label>Phone Number</FormControl.Label>
                <TextInput
                  mode="outlined"
                  placeholder="Enter phone number"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <MaterialIcons
                          name="phone"
                          size={20}
                          color={isDarkMode ? '#F3F4F6' : '#111827'}
                        />
                      )}
                    />
                  }
                  style={styles.textInput}
                />
              </FormControl>

              {/* Password */}
              <FormControl isRequired>
                <FormControl.Label>Password</FormControl.Label>
                <TextInput
                  mode="outlined"
                  placeholder="Enter password"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <MaterialIcons
                          name="lock"
                          size={20}
                          color={isDarkMode ? '#F3F4F6' : '#111827'}
                        />
                      )}
                    />
                  }
                  style={styles.textInput}
                />
              </FormControl>

              {/* Confirm Password */}
              <FormControl isRequired isInvalid={isPasswordMismatch}>
                <FormControl.Label>Confirm Password</FormControl.Label>
                <TextInput
                  mode="outlined"
                  placeholder="Re-enter password"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <MaterialIcons
                          name="lock-outline"
                          size={20}
                          color={isDarkMode ? '#F3F4F6' : '#111827'}
                        />
                      )}
                    />
                  }
                  style={styles.textInput}
                />
                {isPasswordMismatch && (
                  <Text color="red.500" fontSize="xs" mt={1}>
                    Passwords do not match
                  </Text>
                )}
              </FormControl>

              {/* Submit Button */}
              <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.submitButton}
                labelStyle={{
                  fontSize: wp(4.5),
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                }}
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                Next
              </Button>

              {/* Success Message */}
              {accountCreated && (
                <Box bg="green.100" p={3} borderRadius="md">
                  <Text color="green.800" fontWeight="bold">
                    OTP sent successfully
                  </Text>
                </Box>
              )}
            </VStack>
          </Box>
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  box: {
    borderRadius: 16,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  textInput: {
    backgroundColor: 'transparent',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#3B82F6',
    borderRadius: 100,
    paddingVertical: 6,
    alignSelf: 'flex-end',
    paddingHorizontal: 30,
  },
});

export default SignUp;
