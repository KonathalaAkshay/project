import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Button,
  Link,
  Text,
  Center,
  useToast,
  Image,
  HStack,
  Icon,
} from 'native-base';
import { TextInput, StyleSheet, Linking } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import api from '../../API/api'; // Import your axios instance

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('akshay@gmail.com');
  const [password, setPassword] = useState('12345678');
  const toast = useToast();

  // Handle deep links for Google OAuth redirect
  useEffect(() => {
    const handleDeepLink = ({ url }) => {
      if (url && url.includes('myapp://auth')) {
        const params = new URLSearchParams(url.split('?')[1]);
        const success = params.get('success');
        if (success === 'true') {
          navigation.navigate('HomeCard');
        } else {
          toast.show({
            description: params.get('error') || 'Google Sign-Up failed',
            bg: 'red.500',
          });
        }
      }
    };

    // Add listener for deep links
    Linking.addEventListener('url', handleDeepLink);

    // Handle initial URL when app is opened from a killed state
    Linking.getInitialURL().then((url) => {
      if (url && url.includes('myapp://auth')) {
        handleDeepLink({ url });
      }
    });

    // Cleanup listener
    return () => {
      Linking.removeEventListener('url', handleDeepLink);
    };
  }, [navigation]);

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleLogin = () => {
    if (email === 'akshay@gmail.com' && password === '12345678') {
      navigation.navigate('HomeCard');
    } else {
      toast.show({ description: 'Invalid credentials', bg: 'red.500' });
    }
  };

  const handleSignUpWithGoogle = async () => {
    try {
      const response = await api.get('/auth/candidate/google/signup');

      if (
        response.data &&
        response.data.success &&
        response.data.data?.google_oauth_url &&
        response.status === 200
      ) {
        const { google_oauth_url } = response.data.data;
        const supported = await Linking.canOpenURL(google_oauth_url);
        if (response.status === 200) {
          // await Linking.openURL(google_oauth_url);
          navigation.navigate('Register');
        } else {
          throw new Error('Cannot open Google OAuth URL');
        }
      } else {
        throw new Error('Google Sign-Up failed: Invalid response');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Google Sign-Up failed. Please try again.';
      toast.show({ description: errorMessage, bg: 'red.500' });
    }
  };

  return (
    <Center flex={1} px="4" bg="white">
      <Box safeArea w="100%" maxW="300" py="8">
        <Image
          source={{
            uri: 'https://frontend.invotrx.com/static/media/logo.e7351a94c10df23dd703.jpeg',
          }}
          alt="Logo"
          resizeMode="contain"
          style={{
            width: 200,
            height: 150,
            alignSelf: 'center',
            marginBottom: 5,
          }}
        />
        <Heading size="lg" color="coolGray.800" fontWeight="semibold">
          Welcome
        </Heading>
        <Heading mt="1" color="coolGray.600" size="xs" fontWeight="medium">
          Sign in to continue!
        </Heading>

        <VStack space={4} mt="5">
          <FormControl isRequired>
            <FormControl.Label>Email</FormControl.Label>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
          </FormControl>

          <FormControl isRequired>
            <FormControl.Label>Password</FormControl.Label>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />
            <Link
              alignSelf="flex-end"
              mt="1"
              _text={{ fontSize: 'xs', color: 'blue.500' }}
            >
              Forgot Password?
            </Link>
          </FormControl>

          <Button mt="2" colorScheme="blue" onPress={handleLogin}>
            Sign in
          </Button>

          <Text mt="6" textAlign="center" fontSize="sm" color="gray.500">
            Don't have an account?{' '}
            <Link color="blue.500" underline onPress={handleSignUp}>
              Sign Up
            </Link>
          </Text>

          <Button
            mt="2"
            variant="outline"
            borderColor="gray.300"
            borderWidth={1}
            borderRadius={8}
            bg="white"
            _text={{ color: 'gray.800', fontWeight: 'medium' }}
            _pressed={{ bg: 'gray.100' }}
            onPress={handleSignUpWithGoogle}
            leftIcon={
              <Icon
                as={FontAwesome5}
                name="google"
                size="sm"
                color="#4285F4"
                mr="2"
              />
            }
            _hover={{ bg: 'gray.50' }}
            shadow="2"
          >
            <HStack alignItems="center">
              <Text fontSize="sm" color="gray.800">
                Continue with Google
              </Text>
            </HStack>
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: '#F7FAFC',
    color: '#1A202C',
  },
});

export default Login;