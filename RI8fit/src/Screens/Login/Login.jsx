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
  Alert,
} from 'native-base';
import { TextInput, StyleSheet, Linking } from 'react-native';
import axio from '../../API/axio';
import GoogleIcon from '../../Store/GoogleIcon/GoogleIcon';
import {
  ACCESS_TOKEN,
  AUTH_DETAILS,
  EXPIRY_TIME,
  IS_AUTHENTICATED,
  REFRESH_TOKEN,
  setItem,
  USER_DATA,
  USER_TYPE,
} from '../../Utils/helper';
import { useAuth } from '../../Context/AuthContext';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const { setIsAuthenticated } = useAuth();

  // Handle deep links for Google OAuth redirect
  useEffect(() => {
    const handleDeepLink = ({ url }) => {
      if (url && url.startsWith('RI8fit://auth')) {
        try {
          const urlObj = new URL(url);
          const success = urlObj.searchParams.get('success');
          const userId = urlObj.searchParams.get('userId');
          const token = urlObj.searchParams.get('token');

          if (success && userId && token) {
            navigation.navigate('HomeCard', { userId, token });
          } else {
            const errorMessage =
              urlObj.searchParams.get('error') || 'Google Sign-In failed';
            toast.show({ description: errorMessage, bg: 'red.500' });
          }
        } catch (err) {
          toast.show({
            description: 'Invalid deep link format',
            bg: 'red.500',
          });
        }
      }
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);

    Linking.getInitialURL().then(url => {
      if (url && url.startsWith('RI8fit://auth')) {
        handleDeepLink({ url });
      }
    });

    return () => {
      subscription.remove();
    };
  }, [navigation, toast]);

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  // Normal login flow
  const handleLogin = async () => {
    if (!username || !password) {
      toast.show({
        description: 'Please enter both email and password',
        bg: 'red.500',
      });
      return;
    }

    try {
      const response = await axio.post('/auth/candidate/login', {
        username: username,
        password: password,
      });

      if (response.data?.success) {
        const {
          username,
          access_token,
          refresh_token,
          expiry_time,
          token_type,
        } = response.data.data;

        await setItem(AUTH_DETAILS, {
          access_token,
          refresh_token,
          expiry_time,
        });
        await setItem(ACCESS_TOKEN, access_token);
        await setItem(REFRESH_TOKEN, refresh_token);
        await setItem(EXPIRY_TIME, expiry_time.toString());
        await setItem(USER_TYPE, token_type);
        await setItem(USER_DATA, username || '');
        await setItem(IS_AUTHENTICATED, 'true');

        setIsAuthenticated(true);
        navigation.navigate('HomeCard', { token: access_token });
      } else {
        const msg = response.data?.message || 'Login failed';
        throw new Error(msg);
      }
    } catch (error) {
      console.log('Login error:', error.response?.data || error.message);
      const errorMessage =
        error.response?.data?.message || 'Login failed. Please try again.';
      toast.show({ description: errorMessage, bg: 'red.500' });
    }
  };

  // Google OAuth flow
  const handleSignUpWithGoogle = async () => {
    try {
      const response = await axio.get('/auth/candidate/google/mobile/signup');

      if (
        response.data?.success &&
        response.data.data?.google_oauth_url &&
        response.status === 200
      ) {
        const { google_oauth_url } = response.data.data;
        await Linking.openURL(google_oauth_url);
      } else {
        throw new Error('Google Sign-In failed: Invalid response');
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'Google Sign-In failed. Please try again.';
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
          {/* Email Input */}
          <FormControl isRequired>
            <FormControl.Label>Email</FormControl.Label>
            <TextInput
              value={username}
              onChangeText={setUsername}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
          </FormControl>

          {/* Password Input */}
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

          {/* Login Button */}
          <Button mt="2" colorScheme="blue" onPress={handleLogin}>
            Sign in
          </Button>

          {/* Sign Up Link */}
          <Text mt="6" textAlign="center" fontSize="sm" color="gray.500">
            Don't have an account?{' '}
            <Link color="blue.500" underline onPress={handleSignUp}>
              Sign Up
            </Link>
          </Text>

          {/* Google Sign-In Button */}
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
            _hover={{ bg: 'gray.50' }}
            shadow="2"
            leftIcon={<GoogleIcon size={20} />}
          >
            Sign in with Google
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
