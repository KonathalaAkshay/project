/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  VStack,
  FormControl,
  Text,
  Box,
  ScrollView,
} from 'native-base';
import { TextInput, Button } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  Alert,
  StyleSheet,
  useWindowDimensions,
  useColorScheme,
  View,
} from 'react-native';

const SignUp = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const wp = p => (width * p) / 100;
  const hp = p => (height * p) / 100;

  // Icon variables to avoid inline component creation in render
  const personIcon = (
    <MaterialIcons
      name="person"
      size={20}
      color={isDarkMode ? '#F3F4F6' : '#111827'}
    />
  );
  const emailIcon = (
    <MaterialIcons
      name="email"
      size={20}
      color={isDarkMode ? '#F3F4F6' : '#111827'}
    />
  );
  const phoneIcon = (
    <MaterialIcons
      name="phone"
      size={20}
      color={isDarkMode ? '#F3F4F6' : '#111827'}
    />
  );

  const [formData, setFormData] = useState({
    name: 'Akshay',
    contact: '9885894577',
    password: 'Akshay',
  });
  const [email, setEmail] = useState('akshay@gmail.com');
  const [showPassword, setShowPassword] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);

  const isInvalid = email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleInputChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!email.trim()) return 'Valid email is required';
    if (!formData.contact.trim() || formData.contact.length < 10)
      return 'Valid contact number is required';
    if (!formData.password || formData.password.length < 6)
      return 'Password must be at least 6 characters';
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
        setFormData({ name: '', contact: '', password: '' });
        setEmail('');
        navigation.navigate('ResumeUpload');
      }
    } catch {
      Alert.alert('Error', 'Failed to create account. Please try again.');
    }
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: isDarkMode ? '#111827' : '#F3F4F6' }}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: hp(5) }}>
        <Box
          style={styles.box}
          borderRadius="2xl"
          shadowColor={isDarkMode ? '#374151' : '#E5E7EB'}
          shadow={4}
          p={5}
          m={4}
          borderWidth={1}
          mt={4}
          mb={hp(2)}
          bg={isDarkMode ? '#1F2937' : '#FFFFFF'}
        >
          <Text
            style={[
              styles.heading,
              { color: isDarkMode ? '#F3F4F6' : '#111827' },
            ]}
          >
            Employee Sign Up
          </Text>

          <VStack space={hp(2)} marginTop={4}>
            {/* Name Field */}
            <FormControl isRequired>
              <FormControl.Label>Name</FormControl.Label>
              <TextInput
                mode="outlined"
                placeholder="Enter your name"
                value={formData.name}
                onChangeText={text => handleInputChange('name', text)}
                left={<TextInput.Icon icon={personIcon} />}
                style={{
                  backgroundColor: isDarkMode ? '#374151' : '#FFFFFF',
                  color: isDarkMode ? '#F3F4F6' : '#111827',
                }}
                theme={{
                  colors: {
                    primary: '#3B82F6',
                    text: isDarkMode ? '#F3F4F6' : '#111827',
                    placeholder: isDarkMode ? '#9CA3AF' : '#6B7280',
                    background: isDarkMode ? '#374151' : '#FFFFFF',
                  },
                }}
              />
            </FormControl>

            {/* Email Field */}
            <FormControl isRequired isInvalid={isInvalid}>
              <FormControl.Label>Email Address</FormControl.Label>
              <TextInput
                mode="outlined"
                placeholder="Enter email"
                value={email}
                keyboardType="email-address"
                onChangeText={setEmail}
                left={<TextInput.Icon icon={emailIcon} />}
                style={{
                  backgroundColor: isDarkMode ? '#374151' : '#FFFFFF',
                  color: isDarkMode ? '#F3F4F6' : '#111827',
                }}
                theme={{
                  colors: {
                    primary: '#3B82F6',
                    text: isDarkMode ? '#F3F4F6' : '#111827',
                    placeholder: isDarkMode ? '#9CA3AF' : '#6B7280',
                    background: isDarkMode ? '#374151' : '#FFFFFF',
                  },
                }}
              />
              {isInvalid && (
                <Text color="red.500" fontSize="xs" mt={1}>
                  Valid email is required
                </Text>
              )}
            </FormControl>
            {/* Contact Field */}
            <FormControl isRequired>
              <FormControl.Label>Contact Number</FormControl.Label>
              <TextInput
                mode="outlined"
                placeholder="Enter your contact number"
                keyboardType="phone-pad"
                value={formData.contact}
                onChangeText={text => handleInputChange('contact', text)}
                left={<TextInput.Icon icon={phoneIcon} />}
                style={{
                  backgroundColor: isDarkMode ? '#374151' : '#FFFFFF',
                  color: isDarkMode ? '#F3F4F6' : '#111827',
                }}
                theme={{
                  colors: {
                    primary: '#3B82F6',
                    text: isDarkMode ? '#F3F4F6' : '#111827',
                    placeholder: isDarkMode ? '#9CA3AF' : '#6B7280',
                    background: isDarkMode ? '#374151' : '#FFFFFF',
                  },
                }}
              />
            </FormControl>

            {/* Password Field */}
            <FormControl isRequired>
              <FormControl.Label>Password</FormControl.Label>
              <TextInput
                mode="outlined"
                placeholder="Enter password"
                secureTextEntry={!showPassword}
                value={formData.password}
                onChangeText={text => handleInputChange('password', text)}
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowPassword(prev => !prev)}
                  />
                }
                style={{
                  backgroundColor: isDarkMode ? '#374151' : '#FFFFFF',
                  color: isDarkMode ? '#F3F4F6' : '#111827',
                }}
                theme={{
                  colors: {
                    primary: '#3B82F6',
                    text: isDarkMode ? '#F3F4F6' : '#111827',
                    placeholder: isDarkMode ? '#9CA3AF' : '#6B7280',
                    background: isDarkMode ? '#374151' : '#FFFFFF',
                  },
                }}
              />
              <Text fontSize="xs" color="gray.500">
                Password must be at least 6 characters
              </Text>
            </FormControl>

            <FormControl isRequired>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <TextInput
                mode="outlined"
                placeholder="Enter password"
                secureTextEntry={!showPassword}
                value={formData.confirmPassword}
                onChangeText={text => handleInputChange('confirmPassword', text)}
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowPassword(prev => !prev)}
                  />
                }
                style={{
                  backgroundColor: isDarkMode ? '#374151' : '#FFFFFF',
                  color: isDarkMode ? '#F3F4F6' : '#111827',
                }}
                theme={{
                  colors: {
                    primary: '#3B82F6',
                    text: isDarkMode ? '#F3F4F6' : '#111827',
                    placeholder: isDarkMode ? '#9CA3AF' : '#6B7280',
                    background: isDarkMode ? '#374151' : '#FFFFFF',
                  },
                }}
              />
              <Text fontSize="xs" color="gray.500">
                Password must be at least 6 characters
              </Text>
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
              Create Account
            </Button>

            {/* Success Message */}
            {accountCreated && (
              <Box bg="green.100" p={3} borderRadius="md">
                <Text color="green.800" fontWeight="bold">
                  Account created successfully!
                </Text>
              </Box>
            )}
          </VStack>
        </Box>
      </ScrollView>
    </View>
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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#111827',
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
