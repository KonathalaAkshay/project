/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  VStack,
  FormControl,
  Text,
  Box,
  ScrollView,
  HStack,
  useToast,
  Button as NBButton,
} from 'native-base';
import {
  TextInput,
  Button,
  PaperProvider,
  MD3LightTheme,
} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, Platform } from 'react-native';
import axios from 'axios';
// import FilePickerManager from 'react-native-file-picker';

const Register = ({ navigation = { navigate: () => {} } }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    workStatus: '',
  });
  const [email, setEmail] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const toast = useToast();

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
    if (!resumeFile) return 'Resume file is required';

    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(resumeFile.type)) return 'Only PDF, DOC, DOCX files are allowed';

    return null;
  };

  // const handleResumeUpload = () => {
  //   FilePickerManager.showFilePicker(null, (response) => {
  //     if (response.didCancel) return;
  //     if (response.error) {
  //       toast.show({ description: 'File selection failed.' });
  //       return;
  //     }

  //     setResumeFile({
  //       uri: Platform.OS === 'ios' ? response.uri.replace('file://', '') : response.uri,
  //       name: response.fileName,
  //       type: response.type,
  //     });

  //     toast.show({ description: `Resume selected: ${response.fileName}` });
  //   });
  // };

  const handleSubmit = async () => {
    const error = validateForm();
    if (error) {
      toast.show({ description: error });
      return;
    }

    try {
      const data = new FormData();
      data.append('firstName', formData.firstName);
      data.append('lastName', formData.lastName);
      data.append('email', email);
      data.append('phoneNumber', formData.phoneNumber);
      data.append('workStatus', formData.workStatus);
      data.append('resume', {
        uri: resumeFile.uri,
        name: resumeFile.name,
        type: resumeFile.type,
      });

      const response = await axios.post('https://your-api-endpoint.com/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 || response.status === 201) {
        toast.show({ description: 'Account created successfully!' });
        navigation.navigate('ResumeUpload');

        // Reset form
        setFormData({ firstName: '', lastName: '', phoneNumber: '', workStatus: '' });
        setEmail('');
        setResumeFile(null);
      }
    } catch (error) {
      console.error(error);
      toast.show({ description: 'Failed to submit form. Please try again.' });
    }
  };

  return (
    <PaperProvider theme={MD3LightTheme}>
      <ScrollView contentContainerStyle={styles.container}>
        <Box bg="white" p="6" rounded="2xl" shadow={5} width="100%" maxW="400">
          <Text fontSize="xl" fontWeight="bold" mb="5">
            Create Your RI8FIT Profile
          </Text>

          <VStack space={4}>
            {/* First Name */}
            <FormControl isRequired isInvalid={!formData.firstName.trim() && formData.firstName !== ''}>
              <FormControl.Label>First Name</FormControl.Label>
              <TextInput
                mode="outlined"
                label="First Name"
                value={formData.firstName}
                onChangeText={val => handleInputChange('firstName', val)}
                left={<TextInput.Icon icon={() => <MaterialIcons name="person" size={20} />} />}
              />
              <FormControl.ErrorMessage>First name is required</FormControl.ErrorMessage>
            </FormControl>

            {/* Last Name */}
            <FormControl isRequired isInvalid={!formData.lastName.trim() && formData.lastName !== ''}>
              <FormControl.Label>Last Name</FormControl.Label>
              <TextInput
                mode="outlined"
                label="Last Name"
                value={formData.lastName}
                onChangeText={val => handleInputChange('lastName', val)}
                left={<TextInput.Icon icon={() => <MaterialIcons name="person" size={20} />} />}
              />
              <FormControl.ErrorMessage>Last name is required</FormControl.ErrorMessage>
            </FormControl>

            {/* Email */}
            <FormControl isRequired isInvalid={isInvalidEmail}>
              <FormControl.Label>Email</FormControl.Label>
              <TextInput
                mode="outlined"
                label="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                left={<TextInput.Icon icon={() => <MaterialIcons name="email" size={20} />} />}
              />
              <FormControl.ErrorMessage>Valid email is required</FormControl.ErrorMessage>
            </FormControl>

            {/* Phone Number */}
            <FormControl isRequired isInvalid={isInvalidPhone}>
              <FormControl.Label>Phone Number</FormControl.Label>
              <TextInput
                mode="outlined"
                label="Phone Number"
                keyboardType="phone-pad"
                value={formData.phoneNumber}
                onChangeText={val => handleInputChange('phoneNumber', val)}
                left={<TextInput.Icon icon={() => <MaterialIcons name="phone" size={20} />} />}
              />
              <FormControl.ErrorMessage>Valid 10-digit phone number is required</FormControl.ErrorMessage>
            </FormControl>

            {/* Work Status */}
            <FormControl isRequired isInvalid={!formData.workStatus}>
              <FormControl.Label>Work Status</FormControl.Label>
              <HStack space={3}>
                <NBButton
                  flex={1}
                  variant={formData.workStatus === 'experienced' ? 'solid' : 'outline'}
                  onPress={() => handleInputChange('workStatus', 'experienced')}
                >
                  I'm Experienced
                </NBButton>
                <NBButton
                  flex={1}
                  variant={formData.workStatus === 'fresher' ? 'solid' : 'outline'}
                  onPress={() => handleInputChange('workStatus', 'fresher')}
                >
                  I'm a Fresher
                </NBButton>
              </HStack>
              <FormControl.ErrorMessage>Work status is required</FormControl.ErrorMessage>
            </FormControl>

            {/* Resume Upload */}
            {/* <FormControl isRequired isInvalid={!resumeFile}>
              <FormControl.Label>Upload Resume</FormControl.Label>
              <Button
                mode="outlined"
                icon="upload"
                // onPress={handleResumeUpload}
              >
                {resumeFile ? 'Change Resume' : 'Upload Resume'}
              </Button>
              {resumeFile && (
                <Text fontSize="xs" mt="2" color="gray.500">
                  Selected: {resumeFile.name}
                </Text>
              )}
              {!resumeFile && (
                <FormControl.ErrorMessage>Resume file is required</FormControl.ErrorMessage>
              )}
            </FormControl> */}

            {/* Submit Button */}
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={{ marginTop: 20 }}
            >
              Submit
            </Button>
          </VStack>
        </Box>
      </ScrollView>
    </PaperProvider>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
