/* eslint-disable react-native/no-inline-styles */
import { VStack, Text, Pressable, Icon, Box, ScrollView, Button } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { Dimensions, Alert, useColorScheme, View } from 'react-native';

const ResumeUpload = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const { width, height } = Dimensions.get('window');
  const wp = percentage => (width * percentage) / 100;
  const hp = percentage => (height * percentage) / 100;

  const handleSubmit = () => {
    navigation.navigate('Education');
  };

  const handleUpload = () => {
    Alert.alert('Upload Resume', 'Resume upload functionality not implemented yet.');
  };

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? '#111827' : '#F3F4F6' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: hp(5) }}>
        <Box
          borderRadius="2xl"
          p={wp(4)}
          mt={4}
          mb={hp(2)}
          style={styles.boxShadow}
          bg={isDarkMode ? '#1F2937' : '#FFFFFF'}
        >
          <VStack space={4} alignItems="center">
            <Text
              fontSize={24}
              fontWeight="bold"
              color={isDarkMode ? '#F3F4F6' : '#111827'}
              textAlign="center"
            >
              Build Your Career Profile
            </Text>

            <Pressable
              onPress={handleUpload}
              bg={isDarkMode ? '#374151' : '#D1D5DB'}
              p={6}
              borderRadius="md"
              alignItems="center"
              width="100%"
              _pressed={{ bg: isDarkMode ? '#4B5563' : '#9CA3AF' }}
            >
              <Icon
                as={MaterialIcons}
                name="upload-file"
                size="xl"
                color={isDarkMode ? '#E5E7EB' : '#374151'}
              />
              <Text
                fontSize={18}
                mt={3}
                fontWeight="medium"
                color={isDarkMode ? '#E5E7EB' : '#374151'}
              >
                Upload Your Resume
              </Text>
            </Pressable>

            <Text
              fontSize={14}
              textAlign="center"
              color={isDarkMode ? '#9CA3AF' : '#6B7280'}
            >
              Showcase your skills and experience to top employers
            </Text>
          </VStack>
        </Box>

        <Button
          mt={10}
          onPress={handleSubmit}
          alignSelf="flex-end"
          bg="#3B82F6"
          _text={{ color: '#FFFFFF' }}
          borderRadius={100}
          px={8}
        >
          Next
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = {
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
};

export default ResumeUpload;
