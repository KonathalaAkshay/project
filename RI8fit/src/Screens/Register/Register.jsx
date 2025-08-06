/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { VStack, FormControl, Text, Box, ScrollView, HStack } from 'native-base';
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

const Register = ({ navigation }) => {
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

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    workStatus: '',
  });
  const [email, setEmail] = useState('');
  const [accountCreated, setAccountCreated] = useState(false);

  const isInvalidEmail = email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isInvalidPhone = formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber);

  const handleInputChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) return 'First name is required';
    if (!formData.lastName.trim()) return 'Last name is required';
    if (!email.trim() || isInvalidEmail) return 'Valid email is required';
    if (!formData.phoneNumber.trim() || isInvalidPhone) return 'Valid 10-digit phone number is required';
    if (!formData.workStatus) return 'Work status is required';
    return null;
  };

  const handleSubmit = async () => {
    const error = validateForm();
    if (error) {
      Alert.alert('Validation Error', error);
      return;
    }

    try {
      const response = await new Promise(resolve =>
        setTimeout(
          () => resolve({ status: 201, data: { token: 'sample-token' } }),
          1000,
        ),
      );

      if (response.status === 201) {
        setAccountCreated(true);
        setTimeout(() => setAccountCreated(false), 3000);
        setFormData({
          firstName: '',
          lastName: '',
          phoneNumber: '',
          workStatus: '',
        });
        setEmail('');
        navigation.navigate('ResumeUpload');
      }
    } catch {
      Alert.alert('Error', 'Failed to create account. Please try again.');
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
              Create Your RI8FIT Profile
            </Text>

            <VStack space={hp(2)}>
              {/* First Name Field */}
              <FormControl isRequired isInvalid={!formData.firstName.trim() && formData.firstName !== ''}>
                <FormControl.Label>First Name</FormControl.Label>
                <TextInput
                  mode="outlined"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChangeText={value => handleInputChange('firstName', value)}
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <MaterialIcons
                          name="person"
                          size={20}
                          color={isDarkMode ? '#F3F4F6' : '#111827'}
                        />
                      )}
                    />
                  }
                  style={styles.textInput}
                />
                {!formData.firstName.trim() && formData.firstName !== '' && (
                  <Text color="red.500" fontSize="xs" mt={1}>
                    First name is required
                  </Text>
                )}
              </FormControl>

              {/* Last Name Field */}
              <FormControl isRequired isInvalid={!formData.lastName.trim() && formData.lastName !== ''}>
                <FormControl.Label>Last Name</FormControl.Label>
                <TextInput
                  mode="outlined"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChangeText={value => handleInputChange('lastName', value)}
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <MaterialIcons
                          name="person"
                          size={20}
                          color={isDarkMode ? '#F3F4F6' : '#111827'}
                        />
                      )}
                    />
                  }
                  style={styles.textInput}
                />
                {!formData.lastName.trim() && formData.lastName !== '' && (
                  <Text color="red.500" fontSize="xs" mt={1}>
                    Last name is required
                  </Text>
                )}
              </FormControl>

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

              {/* Phone Number Field */}
              <FormControl isRequired isInvalid={isInvalidPhone}>
                <FormControl.Label>Phone Number</FormControl.Label>
                <TextInput
                  mode="outlined"
                  placeholder="Enter phone number"
                  value={formData.phoneNumber}
                  keyboardType="phone-pad"
                  onChangeText={value => handleInputChange('phoneNumber', value)}
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
                {isInvalidPhone && (
                  <Text color="red.500" fontSize="xs" mt={1}>
                    Valid 10-digit phone number is required
                  </Text>
                )}
              </FormControl>

              {/* Work Status Field */}
              <FormControl isRequired isInvalid={!formData.workStatus && formData.workStatus !== ''}>
                <FormControl.Label>Work Status</FormControl.Label>
                <HStack space={2} justifyContent="space-between">
                  <Button
                    mode={formData.workStatus === 'experienced' ? 'contained' : 'outlined'}
                    onPress={() => handleInputChange('workStatus', 'experienced')}
                    style={[styles.statusButton, { width: wp(45) }]}
                    labelStyle={{
                      fontSize: wp(4),
                      color: formData.workStatus === 'experienced' ? '#FFFFFF' : '#3B82F6',
                    }}
                  >
                    I'm Experienced
                  </Button>
                  <Button
                    mode={formData.workStatus === 'fresher' ? 'contained' : 'outlined'}
                    onPress={() => handleInputChange('workStatus', 'fresher')}
                    style={[styles.statusButton, { width: wp(45) }]}
                    labelStyle={{
                      fontSize: wp(4),
                      color: formData.workStatus === 'fresher' ? '#FFFFFF' : '#3B82F6',
                    }}
                  >
                    I'm a Fresher
                  </Button>
                </HStack>
                {!formData.workStatus && formData.workStatus !== '' && (
                  <Text color="red.500" fontSize="xs" mt={1}>
                    Work status is required
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
  statusButton: {
    borderRadius: 8,
    paddingVertical: 4,
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

export default Register;