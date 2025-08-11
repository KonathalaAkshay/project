/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
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

// Ensure react-native-vector-icons is set up:
// - iOS: Add MaterialIcons.ttf to Info.plist
// - Android: Run `npx react-native link` or verify fonts in android/app/src/main/assets/fonts

const SignUp = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const wp = p => (width * p) / 100;
  const hp = p => (height * p) / 100;

  // PaperProvider theme for react-native-paper components
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

  const [email, setEmail] = useState('');
  const [accountCreated, setAccountCreated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isInvalidEmail = email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    if (!email.trim() || isInvalidEmail) return 'Valid email is required';
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
      const response = await api.post(`/auth/candidate/signup?email=${encodeURIComponent(email)}`);

      if (response.status === 200) {
        setAccountCreated(true);
        setTimeout(() => {
          setAccountCreated(false);
          setEmail('');
          navigation.navigate('VerifyOTP');
        }, 3000);
      }
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to create account. Please try again.');
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
              <FormControl isRequired isInvalid={isInvalidEmail}>
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
                {isInvalidEmail && (
                  <Text color="red.500" fontSize="xs" mt={1}>
                    Valid email is required
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