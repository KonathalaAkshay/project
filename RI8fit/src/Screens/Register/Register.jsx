/* eslint-disable react-native/no-inline-styles */
import React, { useState, useContext } from 'react';
import {
  VStack,
  FormControl,
  Text,
  Box,
  ScrollView,
  HStack,
  useToast,
  Button as NBButton,
  Pressable,
  Icon,
} from 'native-base';
import {
  TextInput,
  Button,
  PaperProvider,
  MD3LightTheme,
} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet } from 'react-native';
import { useFilePicker } from '../../Components/ResumeUplod/FileUpload';
import { useImagePicker } from '../../Components/ImageUpload/ImagePicker';
import { UserContext } from '../../Context/UserContext';
import { getItem, ACCESS_TOKEN } from '../../Utils/helper';
import { CandidateContext } from '../../Context/CandidateContext';
import api from '../../API/api';

const Register = ({ navigation = { navigate: () => {} } }) => {
  const { file, pickFile, resetFile } = useFilePicker();
  const { image, pickImage, resetImage } = useImagePicker();

  const { setCandidateData } = useContext(CandidateContext);

  const { email, phone, setEmail, setPhone } = useContext(UserContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firstName, setFirstName] = useState('A');
  const [lastName, setLastName] = useState('K');
  const [workStatus, setWorkStatus] = useState('');
  const toast = useToast();

  const validateForm = () => {
    if (!firstName.trim()) return 'First name is required';
    if (!lastName.trim()) return 'Last name is required';
    if (!workStatus) return 'Work status is required';
    if (!file) return 'Resume file is required';

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (!allowedTypes.includes(file.type))
      return 'Only PDF, DOC, or DOCX files are allowed';

    return null;
  };

  const verifyResumeUpload = async resumeUrl => {
    try {
      const response = await fetch(resumeUrl, { method: 'HEAD' }); // HEAD request to check existence without downloading
      if (response.ok) {
        console.log('✅ Resume file exists and is accessible at:', resumeUrl);
        // Optionally show a toast: toast.show({ description: 'Resume verified successfully!' });
        return true;
      } else {
        console.log(
          '❌ Resume not found or inaccessible (Status:',
          response.status,
          ')',
        );
        return false;
      }
    } catch (error) {
      console.error('❌ Verification error:', error.message);
      return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const errorMessage = validateForm();
      if (errorMessage) {
        toast.show({ description: errorMessage });
        return;
      }

      let formData = new FormData();
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('phone_number', phone);
      formData.append('work_status', workStatus);

      if (file) {
        formData.append('resume', {
          uri: file.uri,
          type: 'application/pdf',
          name: file.name,
        });
      }

      if (image) {
        formData.append('profile_image', {
          uri: image.uri,
          type: image.type || 'image/jpeg',
          name: image.name || `profile_${Date.now()}.jpg`,
        });
      }

      const accessToken = await getItem(ACCESS_TOKEN);

      const response = await fetch(
        'https://dev-backend.invotrx.com/candidate/upload-resume-additional-details/',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        },
      );

      // Early check for HTTP errors
      if (!response.ok) {
        // Read as text to handle non-JSON bodies safely
        const errorText = await response.text();
        console.error('❌ Server Error Response:', errorText);
        throw new Error(
          `Upload failed (Status ${response.status}): ${errorText.substring(
            0,
            200,
          )}...`,
        ); // Truncate for toast
      }

      // Check Content-Type before parsing as JSON
      const contentType = response.headers.get('Content-Type');
      if (!contentType || !contentType.includes('application/json')) {
        const bodyText = await response.text();
        throw new Error(
          `Unexpected response type (${contentType}): ${bodyText.substring(
            0,
            200,
          )}...`,
        );
      }

      // Safe to parse now
      const json = await response.json();

      if (json.success) {
        setCandidateData(json.data);

        navigation.navigate('EducationDetails');

        setFirstName('');
        setLastName('');
        setWorkStatus('');
        setEmail('');
        setPhone('');
        resetFile?.();
        resetImage?.();
      } else {
        throw new Error(json.message || 'Upload did not succeed');
      }
    } catch (error) {
      console.error('❌ API Error (raw):', error);
      console.log('🔎 Error message:', error.message);

      toast.show({
        description:
          error.message || 'Failed to submit form. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
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
            <FormControl
              isRequired
              isInvalid={!firstName.trim() && firstName !== ''}
            >
              {/* <FormControl.Label>First Name</FormControl.Label> */}
              <TextInput
                mode="outlined"
                label="First Name"
                value={firstName}
                onChangeText={setFirstName}
                left={
                  <TextInput.Icon
                    icon={() => <MaterialIcons name="person" size={20} />}
                  />
                }
              />
              <FormControl.ErrorMessage>
                First name is required
              </FormControl.ErrorMessage>
            </FormControl>

            {/* Last Name */}
            <FormControl
              isRequired
              isInvalid={!lastName.trim() && lastName !== ''}
            >
              {/* <FormControl.Label>Last Name</FormControl.Label> */}
              <TextInput
                mode="outlined"
                label="Last Name"
                value={lastName}
                onChangeText={setLastName}
                left={
                  <TextInput.Icon
                    icon={() => <MaterialIcons name="person" size={20} />}
                  />
                }
              />
              <FormControl.ErrorMessage>
                Last name is required
              </FormControl.ErrorMessage>
            </FormControl>

            {/* Phone */}
            <FormControl>
              {/* <FormControl.Label>Phone Number</FormControl.Label> */}
              <TextInput
                mode="outlined"
                label="Phone Number"
                keyboardType="phone-pad"
                value={phone}
                editable={false} // read-only
                left={
                  <TextInput.Icon
                    icon={() => <MaterialIcons name="phone" size={20} />}
                  />
                }
              />
            </FormControl>

            {/* Work Status */}
            <FormControl isRequired isInvalid={!workStatus}>
              <FormControl.Label>Work Status</FormControl.Label>
              <HStack space={3}>
                <NBButton
                  flex={1}
                  variant={workStatus === 'experienced' ? 'solid' : 'outline'}
                  onPress={() => setWorkStatus('experienced')}
                >
                  I'm Experienced
                </NBButton>
                <NBButton
                  flex={1}
                  variant={workStatus === 'fresher' ? 'solid' : 'outline'}
                  onPress={() => setWorkStatus('fresher')}
                >
                  I'm a Fresher
                </NBButton>
              </HStack>
              <FormControl.ErrorMessage>
                Work status is required
              </FormControl.ErrorMessage>
            </FormControl>

            {/* Resume Upload */}
            <HStack space={4} mt={4} w="100%">
              {/* Resume Upload */}
              <Box flex={1} borderRadius="2xl" p={4} bg="white" shadow={2}>
                <VStack space={3} alignItems="center" justifyContent="center">
                  <Pressable
                    onPress={pickFile}
                    bg="#F3F4F6"
                    p={6}
                    borderRadius="xl"
                    alignItems="center"
                    justifyContent="center"
                    w="100%"
                    _pressed={{ bg: '#E5E7EB' }}
                  >
                    <Icon
                      as={MaterialIcons}
                      name="upload-file"
                      size="2xl"
                      color="#374151"
                    />
                    <Text fontSize="sm" mt={2} color="#374151">
                      UploadResume
                    </Text>
                  </Pressable>

                  {file && (
                    <Text
                      fontSize="xs"
                      color="#4B5563"
                      textAlign="center"
                      mt={2}
                      numberOfLines={1}
                    >
                      📄 {file.name || 'Unnamed file'}
                    </Text>
                  )}
                </VStack>
              </Box>

              {/* Image Upload */}
              <Box flex={1} borderRadius="2xl" p={4} bg="white" shadow={2}>
                <VStack space={3} alignItems="center" justifyContent="center">
                  <Pressable
                    onPress={pickImage}
                    bg="#F3F4F6"
                    p={6}
                    borderRadius="xl"
                    alignItems="center"
                    justifyContent="center"
                    w="100%"
                    _pressed={{ bg: '#E5E7EB' }}
                  >
                    <Icon
                      as={MaterialIcons}
                      name="image"
                      size="2xl"
                      color="#374151"
                    />
                    <Text fontSize="sm" mt={2} color="#374151">
                      Upload Image
                    </Text>
                  </Pressable>

                  {image && (
                    <Text
                      fontSize="xs"
                      color="#4B5563"
                      textAlign="center"
                      mt={2}
                      numberOfLines={1}
                    >
                      🖼️ {image.name || 'Unnamed image'}
                    </Text>
                  )}
                </VStack>
              </Box>
            </HStack>

            {/* Submit Button */}
            <Button
              onPress={handleSubmit}
              mode="contained"
              style={styles.submitButton}
              labelStyle={{
                // fontSize: wp(4.5),
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
  submitButton: {
    marginTop: 20,
    backgroundColor: '#1aa1f0ff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
