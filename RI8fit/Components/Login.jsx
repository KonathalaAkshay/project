import React, { useState } from 'react';
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
} from 'native-base';
import { TextInput, StyleSheet } from 'react-native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('akshay@gmail.com');
  const [password, setPassword] = useState('12345678');
  const toast = useToast();

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  }

  const handleLogin = () => {
    if (email === 'akshay@gmail.com' && password === '12345678') {
      navigation.navigate('HomeCard');
    } else {
      toast.show({ description: 'Invalid credentials', bg: 'red.500' });
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
          // eslint-disable-next-line react-native/no-inline-styles
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
        </VStack>
      </Box>
    </Center>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E0', // coolGray.300
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: '#F7FAFC', // gray background
    color: '#1A202C',
  },
});

export default Login;
