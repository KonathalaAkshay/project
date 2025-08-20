// /* eslint-disable react-native/no-inline-styles */
// import React, { useState, useContext } from 'react';
// import {
//   VStack,
//   FormControl,
//   Text,
//   Box,
//   ScrollView,
//   HStack,
//   useToast,
//   Button as NBButton,
//   Pressable,
//   Icon,
// } from 'native-base';
// import {
//   TextInput,
//   Button,
//   PaperProvider,
//   MD3LightTheme,
// } from 'react-native-paper';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { StyleSheet, Platform } from 'react-native';
// import { useFilePicker } from '../../Components/ResumeUplod/FileUpload';
// import { useImagePicker } from '../../Components/ImageUpload/ImagePicker';
// import { UserContext } from '../../Context/UserContext';
// import { getItem, ACCESS_TOKEN } from '../../Utils/helper';
// import api from '../../API/api';

// const Register = ({ navigation = { navigate: () => {} } }) => {
//   const { file, pickFile } = useFilePicker();
//   const { image, pickImage } = useImagePicker();

//   const { email, phone, setEmail, setPhone } = useContext(UserContext);

//   const [formData, setFormData] = useState({
//     first_Name: '',
//     last_Name: '',
//     work_Status: '',
//   });
//   const handleUpload = async () => {
//     try {
//       await pickFile();
//     } catch (error) {
//       console.error('File upload error:', error);
//     }
//   };

//   const handleImageUpload = async () => {
//     try {
//       await pickImage();
//     } catch (error) {
//       console.error('Image upload error:', error);
//     }
//   };
//   const toast = useToast();

//   const isInvalidPhone = phone && !/^\d{10}$/.test(phone);

//   const handleInputChange = (key, value) => {
//     setFormData(prev => ({ ...prev, [key]: value }));
//   };

//   const validateForm = () => {
//     if (!formData.first_Name.trim()) return 'First name is required';
//     if (!formData.last_Name.trim()) return 'Last name is required';
//     if (!formData.work_Status) return 'Work status is required';
//     if (!file) return 'Resume file is required';

//     const allowedTypes = [
//       'application/pdf',
//       'application/msword',
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//     ];
//     if (!allowedTypes.includes(resumeFile.type))
//       return 'Only PDF files are allowed';
//     return null;
//   };

//   const handleSubmit = async () => {
//     const error = validateForm();
//     if (error) {
//       toast.show({ description: error });
//       return;
//     }

//     try {
//       const data = new FormData();
//       data.append('first_Name', formData.firstName);
//       data.append('last_Name', formData.lastName);
//       data.append('phone_Number', phone);
//       data.append('work_Status', formData.workStatus);

//       // Resume File
//       if (file) {
//         data.append('resume', {
//           uri: file.uri,
//           name: file.name || 'resume.pdf',
//           type: file.type || 'application/pdf',
//         });
//       }

//       // Profile Image
//       if (image) {
//         data.append('profile_image', {
//           uri: image.uri,
//           name: image.name || 'profile.jpg',
//           type: image.type || 'image/jpeg',
//         });
//       }

//       const accessToken = await getItem(ACCESS_TOKEN);

//       const response = await api.post(
//         '/candidate/upload-resume-additional-details/',
//         data,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${accessToken}`,
//           },
//         },
//       );

//       // console.log('📌 API Status:', response.status);
//       console.log('📌 API Data:', response.data);

//       if (response.status === 200 && response.data.success === true) {
//         // toast.show({ description: 'Account created successfully!' });
//         navigation.navigate('ResumeUpload');

//         // Reset form
//         setFormData({
//           firstName: '',
//           lastName: '',
//           workStatus: '',
//         });
//         setPhone('');
//         resetFile?.();
//         resetImage?.();
//       }
//     } catch (error) {
//       // console.error('❌ API Error:', error);
//       toast.show({ description: 'Failed to submit form. Please try again.' });
//     }
//   };

//   return (
//     <PaperProvider theme={MD3LightTheme}>
//       <ScrollView contentContainerStyle={styles.container}>
//         <Box bg="white" p="6" rounded="2xl" shadow={5} width="100%" maxW="400">
//           <Text fontSize="xl" fontWeight="bold" mb="5">
//             Create Your RI8FIT Profile
//           </Text>

//           <VStack space={4}>
//             {/* First Name */}
//             <FormControl
//               isRequired
//               isInvalid={
//                 !formData.first_Name.trim() && formData.first_Name !== ''
//               }
//             >
//               <FormControl.Label>First Name</FormControl.Label>
//               <TextInput
//                 mode="outlined"
//                 label="First Name"
//                 value={formData.first_Name}
//                 onChangeText={val => handleInputChange('firstName', val)}
//                 left={
//                   <TextInput.Icon
//                     icon={() => <MaterialIcons name="person" size={20} />}
//                   />
//                 }
//               />
//               <FormControl.ErrorMessage>
//                 First name is required
//               </FormControl.ErrorMessage>
//             </FormControl>

//             {/* Last Name */}
//             <FormControl
//               isRequired
//               isInvalid={
//                 !formData.last_Name.trim() && formData.last_Name !== ''
//               }
//             >
//               <FormControl.Label>Last Name</FormControl.Label>
//               <TextInput
//                 mode="outlined"
//                 label="Last Name"
//                 value={formData.lastName}
//                 onChangeText={val => handleInputChange('lastName', val)}
//                 left={
//                   <TextInput.Icon
//                     icon={() => <MaterialIcons name="person" size={20} />}
//                   />
//                 }
//               />
//               <FormControl.ErrorMessage>
//                 Last name is required
//               </FormControl.ErrorMessage>
//             </FormControl>

//             {/* Phone */}
//             <FormControl isRequired isInvalid={isInvalidPhone}>
//               <FormControl.Label>Phone Number</FormControl.Label>
//               <TextInput
//                 mode="outlined"
//                 label="Phone Number"
//                 keyboardType="phone-pad"
//                 value={phone}
//                 // editable={false}
//                 disabled={true} // read-only
//                 left={
//                   <TextInput.Icon
//                     icon={() => <MaterialIcons name="phone" size={20} />}
//                   />
//                 }
//               />
//             </FormControl>

//             {/* Work Status */}
//             <FormControl isRequired isInvalid={!formData.work_Status}>
//               <FormControl.Label>Work Status</FormControl.Label>
//               <HStack space={3}>
//                 <NBButton
//                   flex={1}
//                   variant={
//                     formData.work_Status === 'experienced' ? 'solid' : 'outline'
//                   }
//                   onPress={() => handleInputChange('workStatus', 'experienced')}
//                 >
//                   I'm Experienced
//                 </NBButton>
//                 <NBButton
//                   flex={1}
//                   variant={
//                     formData.work_Status === 'fresher' ? 'solid' : 'outline'
//                   }
//                   onPress={() => handleInputChange('workStatus', 'fresher')}
//                 >
//                   I'm a Fresher
//                 </NBButton>
//               </HStack>
//               <FormControl.ErrorMessage>
//                 Work status is required
//               </FormControl.ErrorMessage>
//             </FormControl>

//             {/* Resume Upload */}
//             <Box borderRadius="2xl" p={2} mt={2} mb={2} bg="#F9FAFB">
//               <VStack space={4} alignItems="center">
//                 <Pressable
//                   onPress={handleUpload}
//                   bg="#D1D5DB"
//                   p={6}
//                   borderRadius="md"
//                   alignItems="center"
//                   w="100%"
//                   _pressed={{ bg: '#9CA3AF' }}
//                 >
//                   <Icon
//                     as={MaterialIcons}
//                     name="upload-file"
//                     size="xl"
//                     color="#374151"
//                   />
//                   <Text
//                     fontSize="lg"
//                     mt={3}
//                     fontWeight="medium"
//                     color="#374151"
//                   >
//                     Upload Your Resume
//                   </Text>
//                 </Pressable>

//                 {file && (
//                   <Text mt={2} fontSize="sm" color="#374151" textAlign="center">
//                     Selected: {file.name || 'Unnamed file'}
//                   </Text>
//                 )}
//               </VStack>
//             </Box>

//             {/* Image Upload */}
//             <Box borderRadius="2xl" p={4} mt={2} mb={4} bg="#F9FAFB">
//               <VStack space={4} alignItems="center">
//                 <Pressable
//                   onPress={handleImageUpload}
//                   bg="#D1D5DB"
//                   p={6}
//                   borderRadius="md"
//                   alignItems="center"
//                   w="100%"
//                   _pressed={{ bg: '#9CA3AF' }}
//                 >
//                   <Icon
//                     as={MaterialIcons}
//                     name="image"
//                     size="xl"
//                     color="#374151"
//                   />
//                   <Text
//                     fontSize="lg"
//                     mt={3}
//                     fontWeight="medium"
//                     color="#374151"
//                   >
//                     Upload Your Image
//                   </Text>
//                 </Pressable>

//                 {image && (
//                   <Text mt={2} fontSize="sm" color="#374151" textAlign="center">
//                     Selected: {image.name || 'Unnamed image'}
//                   </Text>
//                 )}
//               </VStack>
//             </Box>

//             {/* Submit Button */}
//             <Button
//               mode="contained"
//               onPress={handleSubmit}
//               style={{ marginTop: 20 }}
//             >
//               Submit
//             </Button>
//           </VStack>
//         </Box>
//       </ScrollView>
//     </PaperProvider>
//   );
// };

// export default Register;

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#f2f2f2',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
// });

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
import api from '../../API/api';

const Register = ({ navigation = { navigate: () => {} } }) => {
  const { file, pickFile, resetFile } = useFilePicker();
  const { image, pickImage, resetImage } = useImagePicker();

  const { email, phone, setEmail, setPhone } = useContext(UserContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    console.log('ok');
    try {
      const errorMessage = validateForm();
      if (errorMessage) {
        toast.show({ description: errorMessage });
        return;
      }
      console.log('📌 Submitting form with data:');
      let formData = new FormData();
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('phone_number', phone);
      formData.append('work_status', workStatus);

      // Resume
      if (file) {
        formData.append('resume', {
          uri: file.uri,
          type: "application/pdf",
          name: file.name,
        });
      }

      // Profile image
      if (image) {
        formData.append('profile_image', {
          uri: image.uri,
          type: image.type || 'image/jpeg',
          name: image.name || `profile_${Date.now()}.jpg`,
        });
      }

      const accessToken = await getItem(ACCESS_TOKEN);

      // const response = await api.post(
      //   '/candidate/upload-resume-additional-details/',
      //   data,
      //   {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //       Authorization: `Bearer ${accessToken}`,
      //     },
      //   },
      // );
        
      const response = await fetch("https://dev-backend.invotrx.com/candidate/upload-resume-additional-details/", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      console.log('✅ API Response:', response.data);

      if (response.status === 200 && response.data.success) {
        navigation.navigate('ResumeUpload');
        setFirstName('');
        setLastName('');
        setWorkStatus('');
        setEmail('');
        setPhone('');
        resetFile();
        resetImage();
      }
    } catch (error) {
      console.error('❌ API Error:', error?.response?.data || error.message);
      toast.show({ description: 'Failed to submit form. Please try again.' });
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
              <FormControl.Label>First Name</FormControl.Label>
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
              <FormControl.Label>Last Name</FormControl.Label>
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
              <FormControl.Label>Phone Number</FormControl.Label>
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
            <Box borderRadius="2xl" p={2} mt={2} mb={2} bg="#F9FAFB">
              <VStack space={4} alignItems="center">
                <Pressable
                  onPress={pickFile}
                  bg="#D1D5DB"
                  p={6}
                  borderRadius="md"
                  alignItems="center"
                  w="100%"
                  _pressed={{ bg: '#9CA3AF' }}
                >
                  <Icon
                    as={MaterialIcons}
                    name="upload-file"
                    size="xl"
                    color="#374151"
                  />
                  <Text
                    fontSize="lg"
                    mt={3}
                    fontWeight="medium"
                    color="#374151"
                  >
                    Upload Your Resume
                  </Text>
                </Pressable>

                {file && (
                  <Text mt={2} fontSize="sm" color="#374151" textAlign="center">
                    Selected: {file.name || 'Unnamed file'}
                  </Text>
                )}
              </VStack>
            </Box>

            {/* Image Upload */}
            <Box borderRadius="2xl" p={4} mt={2} mb={4} bg="#F9FAFB">
              <VStack space={4} alignItems="center">
                <Pressable
                  onPress={pickImage}
                  bg="#D1D5DB"
                  p={6}
                  borderRadius="md"
                  alignItems="center"
                  w="100%"
                  _pressed={{ bg: '#9CA3AF' }}
                >
                  <Icon
                    as={MaterialIcons}
                    name="image"
                    size="xl"
                    color="#374151"
                  />
                  <Text
                    fontSize="lg"
                    mt={3}
                    fontWeight="medium"
                    color="#374151"
                  >
                    Upload Your Image
                  </Text>
                </Pressable>

                {image && (
                  <Text mt={2} fontSize="sm" color="#374151" textAlign="center">
                    Selected: {image.name || 'Unnamed image'}
                  </Text>
                )}
              </VStack>
            </Box>

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
    backgroundColor: '#3B82F6',
    borderRadius: 100,
    paddingVertical: 6,
    alignSelf: 'flex-end',
    paddingHorizontal: 30,
  },
});

/* eslint-disable react-native/no-inline-styles */
// import React, { useState, useContext } from 'react';
// import {
//   VStack,
//   FormControl,
//   Text,
//   Box,
//   ScrollView,
//   HStack,
//   useToast,
//   Button as NBButton,
//   Pressable,
//   Icon,
// } from 'native-base';
// import {
//   TextInput,
//   Button,
//   PaperProvider,
//   MD3LightTheme,
// } from 'react-native-paper';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { StyleSheet } from 'react-native';
// import { useFilePicker } from '../../Components/ResumeUplod/FileUpload';
// import { useImagePicker } from '../../Components/ImageUpload/ImagePicker';
// import { UserContext } from '../../Context/UserContext';
// import { getItem, ACCESS_TOKEN } from '../../Utils/helper';
// import api from '../../API/api';

// const Register = ({ navigation = { navigate: () => {} } }) => {
//   const { file, pickFile, resetFile } = useFilePicker();
//   const { image, pickImage, resetImage } = useImagePicker();

//   const { email, phone, setEmail, setPhone } = useContext(UserContext);

//   const [formData, setFormData] = useState({
//     first_Name: '',
//     last_Name: '',
//     work_Status: '',
//   });

//   const toast = useToast();
//   const isInvalidPhone = phone && !/^\d{10}$/.test(phone);

//   const handleInputChange = (key, value) => {
//     setFormData(prev => ({ ...prev, [key]: value }));
//   };

//   const handleUpload = async () => {
//     try {
//       await pickFile();
//     } catch (error) {
//       console.error('File upload error:', error);
//     }
//   };

//   const handleImageUpload = async () => {
//     try {
//       await pickImage();
//     } catch (error) {
//       console.error('Image upload error:', error);
//     }
//   };

//   const validateForm = () => {
//     if (!formData.first_Name.trim()) return 'First name is required';
//     if (!formData.last_Name.trim()) return 'Last name is required';
//     if (!formData.work_Status) return 'Work status is required';
//     if (!file) return 'Resume file is required';

//     const allowedTypes = [
//       'application/pdf',
//       'application/msword',
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//     ];
//     if (!allowedTypes.includes(file.type))
//       return 'Only PDF, DOC, or DOCX files are allowed';
//     return null;
//   };

//   const handleSubmit = async () => {
//     const error = validateForm();
//     if (error) {
//       toast.show({ description: error });
//       return;
//     }

//     try {
//       const data = new FormData();
//       data.append('first_name', formData.first_Name);
//       data.append('last_name', formData.last_Name);
//       data.append('phone_number', phone);
//       data.append('work_status', formData.work_Status);

//       // Resume File
//       if (file) {
//         data.append('resume', {
//           uri: file.uri,
//           name: file.name || 'resume.pdf',
//           type: file.type || 'application/pdf',
//         });
//       }

//       // Profile Image
//       if (image) {
//         data.append('profile_image', {
//           uri: image.uri,
//           name: image.name || 'profile.jpg',
//           type: image.type || 'image/jpeg',
//         });
//       }

//       const accessToken = await getItem(ACCESS_TOKEN);

//       const response = await api.post(
//         '/candidate/upload-resume-additional-details/',
//         data,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${accessToken}`,
//           },
//         },
//       );

//       console.log('📌 API Status:', response.status);
//       console.log('📌 API Data:', response.data);

//       if (response.status === 200 && response.data.success === true) {
//         toast.show({ description: 'Account created successfully!' });
//         navigation.navigate('ResumeUpload');

//         // Reset form
//         setFormData({
//           first_Name: '',
//           last_Name: '',
//           work_Status: '',
//         });
//         setPhone('');
//         resetFile?.();
//         resetImage?.();
//       }
//     } catch (error) {
//       console.error('❌ API Error:', error);
//       toast.show({ description: 'Failed to submit form. Please try again.' });
//     }
//   };

//   return (
//     <PaperProvider theme={MD3LightTheme}>
//       <ScrollView contentContainerStyle={styles.container}>
//         <Box bg="white" p="6" rounded="2xl" shadow={5} width="100%" maxW="400">
//           <Text fontSize="xl" fontWeight="bold" mb="5">
//             Create Your RI8FIT Profile
//           </Text>

//           <VStack space={4}>
//             {/* First Name */}
//             <FormControl
//               isRequired
//               isInvalid={
//                 !formData.first_Name.trim() && formData.first_Name !== ''
//               }
//             >
//               <FormControl.Label>First Name</FormControl.Label>
//               <TextInput
//                 mode="outlined"
//                 label="First Name"
//                 value={formData.first_Name}
//                 onChangeText={val => handleInputChange('first_Name', val)}
//                 left={
//                   <TextInput.Icon
//                     icon={() => <MaterialIcons name="person" size={20} />}
//                   />
//                 }
//               />
//               <FormControl.ErrorMessage>
//                 First name is required
//               </FormControl.ErrorMessage>
//             </FormControl>

//             {/* Last Name */}
//             <FormControl
//               isRequired
//               isInvalid={
//                 !formData.last_Name.trim() && formData.last_Name !== ''
//               }
//             >
//               <FormControl.Label>Last Name</FormControl.Label>
//               <TextInput
//                 mode="outlined"
//                 label="Last Name"
//                 value={formData.last_Name}
//                 onChangeText={val => handleInputChange('last_Name', val)}
//                 left={
//                   <TextInput.Icon
//                     icon={() => <MaterialIcons name="person" size={20} />}
//                   />
//                 }
//               />
//               <FormControl.ErrorMessage>
//                 Last name is required
//               </FormControl.ErrorMessage>
//             </FormControl>

//             {/* Phone */}
//             <FormControl isRequired isInvalid={isInvalidPhone}>
//               <FormControl.Label>Phone Number</FormControl.Label>
//               <TextInput
//                 mode="outlined"
//                 label="Phone Number"
//                 keyboardType="phone-pad"
//                 value={phone}
//                 disabled={true} // read-only
//                 left={
//                   <TextInput.Icon
//                     icon={() => <MaterialIcons name="phone" size={20} />}
//                   />
//                 }
//               />
//             </FormControl>

//             {/* Work Status */}
//             <FormControl isRequired isInvalid={!formData.work_Status}>
//               <FormControl.Label>Work Status</FormControl.Label>
//               <HStack space={3}>
//                 <NBButton
//                   flex={1}
//                   variant={
//                     formData.work_Status === 'experienced' ? 'solid' : 'outline'
//                   }
//                   onPress={() =>
//                     handleInputChange('work_Status', 'experienced')
//                   }
//                 >
//                   I'm Experienced
//                 </NBButton>
//                 <NBButton
//                   flex={1}
//                   variant={
//                     formData.work_Status === 'fresher' ? 'solid' : 'outline'
//                   }
//                   onPress={() => handleInputChange('work_Status', 'fresher')}
//                 >
//                   I'm a Fresher
//                 </NBButton>
//               </HStack>
//               <FormControl.ErrorMessage>
//                 Work status is required
//               </FormControl.ErrorMessage>
//             </FormControl>

//             {/* Resume Upload */}
//             <Box borderRadius="2xl" p={2} mt={2} mb={2} bg="#F9FAFB">
//               <VStack space={4} alignItems="center">
//                 <Pressable
//                   onPress={handleUpload}
//                   bg="#D1D5DB"
//                   p={6}
//                   borderRadius="md"
//                   alignItems="center"
//                   w="100%"
//                   _pressed={{ bg: '#9CA3AF' }}
//                 >
//                   <Icon
//                     as={MaterialIcons}
//                     name="upload-file"
//                     size="xl"
//                     color="#374151"
//                   />
//                   <Text
//                     fontSize="lg"
//                     mt={3}
//                     fontWeight="medium"
//                     color="#374151"
//                   >
//                     Upload Your Resume
//                   </Text>
//                 </Pressable>

//                 {file && (
//                   <Text mt={2} fontSize="sm" color="#374151" textAlign="center">
//                     Selected: {file.name || 'Unnamed file'}
//                   </Text>
//                 )}
//               </VStack>
//             </Box>

//             {/* Image Upload */}
//             <Box borderRadius="2xl" p={4} mt={2} mb={4} bg="#F9FAFB">
//               <VStack space={4} alignItems="center">
//                 <Pressable
//                   onPress={handleImageUpload}
//                   bg="#D1D5DB"
//                   p={6}
//                   borderRadius="md"
//                   alignItems="center"
//                   w="100%"
//                   _pressed={{ bg: '#9CA3AF' }}
//                 >
//                   <Icon
//                     as={MaterialIcons}
//                     name="image"
//                     size="xl"
//                     color="#374151"
//                   />
//                   <Text
//                     fontSize="lg"
//                     mt={3}
//                     fontWeight="medium"
//                     color="#374151"
//                   >
//                     Upload Your Image
//                   </Text>
//                 </Pressable>

//                 {image && (
//                   <Text mt={2} fontSize="sm" color="#374151" textAlign="center">
//                     Selected: {image.name || 'Unnamed image'}
//                   </Text>
//                 )}
//               </VStack>
//             </Box>

//             {/* Submit Button */}
//             <Button
//               mode="contained"
//               onPress={handleSubmit}
//               style={{ marginTop: 20 }}
//             >
//               Submit
//             </Button>
//           </VStack>
//         </Box>
//       </ScrollView>
//     </PaperProvider>
//   );
// };

// export default Register;

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#f2f2f2',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
// });
