/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  useWindowDimensions,
  useColorScheme,
} from 'react-native';
import { Box, VStack, FormControl, Text } from 'native-base';
import {
  PaperProvider,
  TextInput,
  Button,
  MD3LightTheme,
  MD3DarkTheme,
} from 'react-native-paper';
import api from '../../API/api'; // axios instance
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getItem, ACCESS_TOKEN } from '../../Utils/helper';

const VerifyOTP = ({ route, navigation }) => {
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

  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!otp.trim()) return 'OTP is required';
  };

  const handleSubmit = async () => {
    const error = validateForm();
    if (error) {
      Alert.alert('Validation Error', error);
      return;
    }

    setIsSubmitting(true);
    try {
      const accessToken = await getItem(ACCESS_TOKEN);

      const response = await api.post(
        '/auth/candidate/verify-otp',
        {}, // no body
        {
          params: { otp },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.status === 200) {
        Alert.alert('Success', 'Account verified successfully!', [
          { text: 'OK', onPress: () => navigation.navigate('Register') },
        ]);
      } else {
        Alert.alert('Error', 'Verification failed. Please try again.');
      }
    } catch (err) {
      Alert.alert(
        'Error',
        err.response?.data?.message || 'Something went wrong.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PaperProvider theme={theme}>
      <View
        style={{ flex: 1, backgroundColor: isDarkMode ? '#111827' : '#F3F4F6' }}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: hp(5) }}>
          <Box
            borderRadius="2xl"
            shadow={4}
            p={5}
            m={4}
            mt={4}
            bg={isDarkMode ? '#1F2937' : '#FFFFFF'}
            style={styles.box}
            alignItems={'center'}
          >
            <Text
              fontSize={22}
              fontWeight="bold"
              mb={4}
              color={isDarkMode ? '#F3F4F6' : '#111827'}
            >
              Complete OTP Verification
            </Text>

            <VStack space={hp(2)}>
              {/* OTP */}
              <FormControl isRequired>
                <FormControl.Label>OTP</FormControl.Label>
                <TextInput
                  mode="outlined"
                  placeholder="Enter OTP"
                  value={otp}
                  keyboardType="number-pad"
                  onChangeText={setOtp}
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
              </FormControl>

              {/* Submit */}
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
                Submit
              </Button>
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

export default VerifyOTP;
