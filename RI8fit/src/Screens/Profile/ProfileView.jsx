// /* eslint-disable react-native/no-inline-styles */
// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   HStack,
//   VStack,
//   Avatar,
//   ScrollView,
//   Badge,
//   Divider,
//   Text,
// } from 'native-base';
// import { StyleSheet, Dimensions, useColorScheme } from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import axios from 'axios';
// import BottomNavBar from '../../Components/NavBar/BottomNav';

// const { width, height } = Dimensions.get('window');

// const wp = percentage => (width * percentage) / 100;
// const hp = percentage => (height * percentage) / 100;

// const ProfileView = () => {
//   const colorScheme = useColorScheme();
//   const isDarkMode = colorScheme === 'dark';

//   const { candidateData, setCandidateData } = useContext(CandidateContext);

//   const [name, setName] = useState('');
//   const [dob, setDob] = useState('');
//   const [education, setEducation] = useState('');
//   const [experience, setExperience] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [profile, setProfile] = useState('');
//   const [report, setReport] = useState('');
//   const [summary, setSummary] = useState('');
//   const [additional, setAdditional] = useState('');
//   const [entries, setEntries] = useState([]);
//   const [professionalDetails, setProfessionalDetails] = useState({
//     industry: '',
//     department: '',
//     roleCategory: '',
//     jobRole: '',
//   });
//   const [careerPreferences, setCareerPreferences] = useState({
//     Location: '',
//     Role: '',
//     preferredSalary: '',
//     preferredShift: '',
//     jobType: '',
//     employmentType: '',
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   // Fetch profile data on component mount
//   useEffect(() => {
//     fetchProfileData();
//   }, []);

//   const fetchProfileData = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(API_BASE_URL);
//       const user = response.data.results[0];
//       setName(`${user.name.first} ${user.name.last}`);
//       setDob(
//         new Date(user.dob.date).toLocaleDateString('en-GB', {
//           day: '2-digit',
//           month: 'short',
//           year: 'numeric',
//         }),
//       );
//       setProfile('');
//       setEmail('');
//       setPhone('');
//       setEducation('');
//       setExperience('');
//       setReport('');
//       setSummary('');
//       setAdditional('');
//       setEntries('');
//       setProfessionalDetails({
//         industry: '',
//         department: '',
//         roleCategory: '',
//         jobRole: '',
//       });
//       setCareerPreferences({
//         preferredLocation:  '',
//         preferredRole: '',
//         preferredSalary: '',
//         preferredShift: '',
//         jobType: '',
//         employmentType: '',
//       });
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//       setErrors({ fetch: 'Failed to load profile data' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toTitleCase = str =>
//     str
//       .replace(/([A-Z])/g, ' $1')
//       .replace(/^./, s => s.toUpperCase())
//       .trim();

//   const renderField = (label, value, icon) => (
//     <HStack alignItems="center" space={3} mb={hp(2)}>
//       <Text
//         bold
//         width="30%"
//         fontSize={wp(4)}
//         color={isDarkMode ? '#E5E7EB' : '#1F2937'}
//       >
//         {icon} {label}
//       </Text>
//       <Text
//         flex={1}
//         fontSize={wp(4)}
//         color={isDarkMode ? '#E5E7EB' : '#1F2937'}
//       >
//         {value || 'Not provided'}
//       </Text>
//     </HStack>
//   );

//   return (
//     <Box
//       style={[
//         styles.container,
//         { backgroundColor: isDarkMode ? '#1F2937' : '#F3F4F6' },
//       ]}
//     >
//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         {loading && (
//           <Text
//             fontSize={wp(4)}
//             color={isDarkMode ? '#E5E7EB' : '#1F2937'}
//             textAlign="center"
//             mt={hp(2)}
//           >
//             Loading...
//           </Text>
//         )}
//         {Object.values(errors).map((error, index) => (
//           <Text
//             key={index}
//             fontSize={wp(3.5)}
//             color="red.500"
//             textAlign="center"
//             mt={hp(1)}
//           >
//             {error}
//           </Text>
//         ))}
//         {/* Profile Header */}
//         <Box
//           bg={isDarkMode ? '#374151' : '#FFFFFF'}
//           borderRadius="2xl"
//           p={wp(4)}
//           mb={hp(2)}
//           shadow={4}
//           width="100%"
//           alignItems="center"
//           mt={4}
//         >
//           <Avatar
//             size={wp(24)}
//             source={{ uri: profile }}
//             mb={hp(2)}
//             bg={isDarkMode ? '#4B5563' : '#BFDBFE'}
//             borderWidth={2}
//             borderColor="#3B82F6"
//           >
//             <Text color={isDarkMode ? '#E5E7EB' : '#1F2937'}>
//               {name ? name[0] : ''}
//             </Text>
//           </Avatar>
//           <Text
//             fontSize={wp(6)}
//             fontWeight="bold"
//             color={isDarkMode ? '#E5E7EB' : '#1F2937'}
//           >
//             {name}
//           </Text>
//           <Text
//             fontSize={wp(4)}
//             mt={hp(1)}
//             color={isDarkMode ? '#D1D5DB' : '#4B5563'}
//             style={{ textAlign: 'center' }}
//           >
//             {email}
//           </Text>
//         </Box>

//         {/* Video & Resume Profile Section */}
//         <Box
//           bg={isDarkMode ? '#374151' : '#FFFFFF'}
//           borderRadius="2xl"
//           p={6}
//           mb={6}
//           shadow={4}
//         >
//           <Text
//             fontSize="lg"
//             fontWeight="bold"
//             mb={4}
//             color={isDarkMode ? '#E5E7EB' : '#1F2937'}
//           >
//             Video Profile
//           </Text>
//           <Box
//             bg={isDarkMode ? '#4B5563' : '#E5E7EB'}
//             p={8}
//             borderRadius="lg"
//             alignItems="center"
//           >
//             {/* <Icon
//               as={MaterialIcons}
//               name="video-call"
//               size="lg"
//               color={isDarkMode ? '#D1D5DB' : '#4B5563'}
//             /> */}
//             <Text
//               fontSize="md"
//               mt={2}
//               color={isDarkMode ? '#D1D5DB' : '#4B5563'}
//             >
//               No video available
//             </Text>
//           </Box>
//           <Divider my={6} bg={isDarkMode ? '#6B7280' : '#D1D5DB'} />
//           <Text
//             fontSize="lg"
//             fontWeight="bold"
//             mb={4}
//             color={isDarkMode ? '#E5E7EB' : '#1F2937'}
//           >
//             Resume
//           </Text>
//           <Box
//             bg={isDarkMode ? '#4B5563' : '#E5E7EB'}
//             p={8}
//             borderRadius="lg"
//             alignItems="center"
//           >
//             {/* <Icon
//               as={MaterialIcons}
//               name="description"
//               size="lg"
//               color={isDarkMode ? '#D1D5DB' : '#4B5563'}
//             /> */}
//             <Text
//               fontSize="md"
//               mt={2}
//               color={isDarkMode ? '#D1D5DB' : '#4B5563'}
//             >
//               No resume available
//             </Text>
//           </Box>
//         </Box>

//         {/* Profile Summary */}
//         <Box
//           bg={isDarkMode ? '#374151' : '#FFFFFF'}
//           borderRadius="2xl"
//           p={6}
//           mb={6}
//           shadow={4}
//         >
//           <Text
//             fontSize="lg"
//             fontWeight="bold"
//             mb={4}
//             color={isDarkMode ? '#E5E7EB' : '#1F2937'}
//           >
//             Profile Summary
//           </Text>
//           <Text fontSize={wp(4)} color={isDarkMode ? '#E5E7EB' : '#1F2937'}>
//             {summary || 'No summary provided'}
//           </Text>
//         </Box>

//         {/* Basic Details */}
//         <Box
//           bg={isDarkMode ? '#374151' : '#FFFFFF'}
//           borderRadius="2xl"
//           p={wp(4)}
//           mb={hp(2)}
//           shadow={4}
//           width="100%"
//         >
//           <Text
//             fontSize={wp(4.5)}
//             fontWeight="bold"
//             mb={hp(2)}
//             color={isDarkMode ? '#E5E7EB' : '#1F2937'}
//           >
//             Basic Details
//           </Text>
//           {renderField('', dob, '📅')}
//           {renderField('', `${experience} years`, '💼')}
//           {renderField('', education, '📖')}
//           {renderField('', email, '✉️')}
//           {renderField('', phone, '📱')}
//           {renderField('', `Available in ${report}`, '📆')}
//         </Box>

//         {/* Skills Section */}
//         <Box
//           bg={isDarkMode ? '#374151' : '#FFFFFF'}
//           borderRadius="2xl"
//           p={wp(4)}
//           mb={hp(2)}
//           shadow={4}
//           width="100%"
//         >
//           <Text
//             fontSize={wp(4.5)}
//             fontWeight="bold"
//             mb={hp(2)}
//             color={isDarkMode ? '#E5E7EB' : '#1F2937'}
//           >
//             Skills
//           </Text>
//           <HStack space={2} flexWrap="wrap">
//             {entries.length > 0 ? (
//               entries.map((item, index) => (
//                 <Badge
//                   key={index}
//                   bg={isDarkMode ? '#4B5563' : '#BFDBFE'}
//                   borderRadius="full"
//                   px={wp(3)}
//                   py={hp(1)}
//                   _text={{
//                     color: isDarkMode ? '#BFDBFE' : '#2563EB',
//                     fontSize: wp(4),
//                   }}
//                 >
//                   {item}
//                 </Badge>
//               ))
//             ) : (
//               <Text fontSize={wp(4)} color={isDarkMode ? '#E5E7EB' : '#1F2937'}>
//                 No skills listed
//               </Text>
//             )}
//           </HStack>
//         </Box>

//         {/* Professional Details */}
//         <Box
//           bg={isDarkMode ? '#374151' : '#FFFFFF'}
//           borderRadius="2xl"
//           p={wp(4)}
//           mb={hp(2)}
//           shadow={4}
//           width="100%"
//         >
//           <Text
//             fontSize={wp(4.5)}
//             fontWeight="bold"
//             mb={hp(2)}
//             color={isDarkMode ? '#E5E7EB' : '#1F2937'}
//           >
//             Professional Details
//           </Text>
//           <VStack space={hp(2)}>
//             {Object.keys(professionalDetails).map(key => (
//               <HStack key={key} alignItems="center" space={3}>
//                 <Text
//                   bold
//                   width="30%"
//                   fontSize={wp(4)}
//                   color={isDarkMode ? '#E5E7EB' : '#1F2937'}
//                 >
//                   {toTitleCase(key)}
//                 </Text>
//                 <Text
//                   flex={1}
//                   fontSize={wp(4)}
//                   color={isDarkMode ? '#E5E7EB' : '#1F2937'}
//                 >
//                   {professionalDetails[key] || 'Not provided'}
//                 </Text>
//               </HStack>
//             ))}
//           </VStack>
//         </Box>

//         {/* Career Preferences */}
//         <Box
//           bg={isDarkMode ? '#374151' : '#FFFFFF'}
//           borderRadius="2xl"
//           p={wp(4)}
//           mb={hp(2)}
//           shadow={4}
//           width="100%"
//         >
//           <Text
//             fontSize={wp(4.5)}
//             fontWeight="bold"
//             mb={hp(2)}
//             color={isDarkMode ? '#E5E7EB' : '#1F2937'}
//           >
//             Career Preferences
//           </Text>
//           <VStack space={hp(2)}>
//             {Object.keys(careerPreferences).map(key => (
//               <HStack key={key} alignItems="center" space={3}>
//                 <Text
//                   bold
//                   width="30%"
//                   fontSize={wp(4)}
//                   color={isDarkMode ? '#E5E7EB' : '#1F2937'}
//                 >
//                   {toTitleCase(key)}
//                 </Text>
//                 <Text
//                   flex={1}
//                   fontSize={wp(4)}
//                   color={isDarkMode ? '#E5E7EB' : '#1F2937'}
//                 >
//                   {careerPreferences[key] || 'Not provided'}
//                 </Text>
//               </HStack>
//             ))}
//           </VStack>
//         </Box>

//         {/* Additional Details */}
//         <Box
//           bg={isDarkMode ? '#374151' : '#FFFFFF'}
//           borderRadius="2xl"
//           p={wp(4)}
//           mb={hp(2)}
//           shadow={4}
//           width="100%"
//         >
//           <Text
//             fontSize={wp(4.5)}
//             fontWeight="bold"
//             mb={hp(2)}
//             color={isDarkMode ? '#E5E7EB' : '#1F2937'}
//           >
//             Additional Details
//           </Text>
//           <Text fontSize={wp(4)} color={isDarkMode ? '#E5E7EB' : '#1F2937'}>
//             {additional || 'No additional details provided'}
//           </Text>
//         </Box>
//       </ScrollView>
//       <BottomNavBar />
//     </Box>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollContent: {
//     paddingHorizontal: wp(4),
//     paddingBottom: hp(10),
//   },
// });

// export default ProfileView;

// /* eslint-disable react-native/no-inline-styles */
// import React, { useState, useEffect, useContext } from 'react';
// import {
//   Box,
//   HStack,
//   VStack,
//   Avatar,
//   ScrollView,
//   Badge,
//   Divider,
//   Text,
// } from 'native-base';
// import { StyleSheet, Dimensions, useColorScheme } from 'react-native';
// import BottomNavBar from '../../Components/NavBar/BottomNav';
// import { CandidateContext } from '../../Context/CandidateContext'; // adjust import if needed

// const { width, height } = Dimensions.get('window');

// const wp = percentage => (width * percentage) / 100;
// const hp = percentage => (height * percentage) / 100;

// const ProfileView = () => {
//   const colorScheme = useColorScheme();
//   const isDarkMode = colorScheme === 'dark';

//   const { candidateData } = useContext(CandidateContext);

//   const [name, setName] = useState('');
//   const [dob, setDob] = useState('');
//   const [education, setEducation] = useState([]);
//   const [experience, setExperience] = useState([]);
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [profile, setProfile] = useState('');
//   const [report, setReport] = useState('');
//   const [summary, setSummary] = useState('');
//   const [entries, setEntries] = useState([]);

//   useEffect(() => {
//     if (candidateData && candidateData.data) {
//       const user = candidateData.data;
//       const resume = user.resume_data;

//       setName(`${user.first_name} ${user.last_name}`);
//       setEmail(user.email || '');
//       setPhone(user.phone_number || '');
//       setEducation(resume?.education || []);
//       setExperience(resume?.professional_experience || []);
//       setReport(resume?.availability || 'Not specified');
//       setSummary(resume?.professional_summary || '');
//       setEntries(
//         resume?.technical_skills && resume.technical_skills !== 'Not Specified'
//           ? resume.technical_skills.split(',').map(s => s.trim())
//           : [],
//       );
//     }
//   }, [candidateData]);

//   const toTitleCase = str =>
//     str
//       .replace(/([A-Z])/g, ' $1')
//       .replace(/^./, s => s.toUpperCase())
//       .trim();

//   const renderField = (label, value, icon) => (
//     <HStack alignItems="center" space={3} mb={hp(2)}>
//       <Text
//         bold
//         width="30%"
//         fontSize={wp(4)}
//         color={isDarkMode ? '#E5E7EB' : '#1F2937'}
//       >
//         {icon} {label}
//       </Text>
//       <Text
//         flex={1}
//         fontSize={wp(4)}
//         color={isDarkMode ? '#E5E7EB' : '#1F2937'}
//       >
//         {value || 'Not provided'}
//       </Text>
//     </HStack>
//   );

//   return (
//     <Box
//       style={[
//         styles.container,
//         { backgroundColor: isDarkMode ? '#1F2937' : '#F3F4F6' },
//       ]}
//     >
//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Profile Header */}
//         <Box
//           bg={isDarkMode ? '#374151' : '#FFFFFF'}
//           borderRadius="2xl"
//           p={wp(4)}
//           mb={hp(2)}
//           shadow={4}
//           width="100%"
//           alignItems="center"
//           mt={4}
//         >
//           <Avatar
//             size={wp(24)}
//             source={{ uri: profile }}
//             mb={hp(2)}
//             bg={isDarkMode ? '#4B5563' : '#BFDBFE'}
//             borderWidth={2}
//             borderColor="#3B82F6"
//           >
//             <Text color={isDarkMode ? '#E5E7EB' : '#1F2937'}>
//               {name ? name[0] : ''}
//             </Text>
//           </Avatar>
//           <Text
//             fontSize={wp(6)}
//             fontWeight="bold"
//             color={isDarkMode ? '#E5E7EB' : '#1F2937'}
//           >
//             {name}
//           </Text>
//           <Text
//             fontSize={wp(4)}
//             mt={hp(1)}
//             color={isDarkMode ? '#D1D5DB' : '#4B5563'}
//             style={{ textAlign: 'center' }}
//           >
//             {email}
//           </Text>
//         </Box>

//         {/* Resume Section */}
//         <Box
//           bg={isDarkMode ? '#374151' : '#FFFFFF'}
//           borderRadius="2xl"
//           p={6}
//           mb={6}
//           shadow={4}
//         >
//           <Text
//             fontSize="lg"
//             fontWeight="bold"
//             mb={4}
//             color={isDarkMode ? '#E5E7EB' : '#1F2937'}
//           >
//             Resume
//           </Text>
//           <Box
//             bg={isDarkMode ? '#4B5563' : '#E5E7EB'}
//             p={8}
//             borderRadius="lg"
//             alignItems="center"
//           >
//             <Text
//               fontSize="md"
//               mt={2}
//               color={isDarkMode ? '#D1D5DB' : '#4B5563'}
//             >
//               {candidateData?.data?.resume_url || 'No resume available'}
//             </Text>
//           </Box>
//         </Box>

//         {/* Profile Summary */}
//         <Box
//           bg={isDarkMode ? '#374151' : '#FFFFFF'}
//           borderRadius="2xl"
//           p={6}
//           mb={6}
//           shadow={4}
//         >
//           <Text
//             fontSize="lg"
//             fontWeight="bold"
//             mb={4}
//             color={isDarkMode ? '#E5E7EB' : '#1F2937'}
//           >
//             Profile Summary
//           </Text>
//           <Text fontSize={wp(4)} color={isDarkMode ? '#E5E7EB' : '#1F2937'}>
//             {summary || 'No summary provided'}
//           </Text>
//         </Box>

//         {/* Basic Details */}
//         <Box
//           bg={isDarkMode ? '#374151' : '#FFFFFF'}
//           borderRadius="2xl"
//           p={wp(4)}
//           mb={hp(2)}
//           shadow={4}
//           width="100%"
//         >
//           <Text
//             fontSize={wp(4.5)}
//             fontWeight="bold"
//             mb={hp(2)}
//             color={isDarkMode ? '#E5E7EB' : '#1F2937'}
//           >
//             Basic Details
//           </Text>
//           {renderField('Email', email, '✉️')}
//           {renderField('Phone', phone, '📱')}
//           {renderField('Availability', report, '📆')}
//           {renderField(
//             'Experience',
//             candidateData?.data?.resume_data?.total_exp,
//             '💼',
//           )}
//         </Box>

//         {/* Education */}
//         <Box
//           bg={isDarkMode ? '#374151' : '#FFFFFF'}
//           borderRadius="2xl"
//           p={wp(4)}
//           mb={hp(2)}
//           shadow={4}
//           width="100%"
//         >
//           <Text
//             fontSize={wp(4.5)}
//             fontWeight="bold"
//             mb={hp(2)}
//             color={isDarkMode ? '#E5E7EB' : '#1F2937'}
//           >
//             Education
//           </Text>
//           <VStack space={2}>
//             {education.length > 0 ? (
//               education.map((edu, idx) => (
//                 <Text
//                   key={idx}
//                   fontSize={wp(4)}
//                   color={isDarkMode ? '#E5E7EB' : '#1F2937'}
//                 >
//                   {edu.course} - {edu.university} ({edu.year})
//                 </Text>
//               ))
//             ) : (
//               <Text>No education details</Text>
//             )}
//           </VStack>
//         </Box>

//         {/* Skills */}
//         <Box
//           bg={isDarkMode ? '#374151' : '#FFFFFF'}
//           borderRadius="2xl"
//           p={wp(4)}
//           mb={hp(2)}
//           shadow={4}
//           width="100%"
//         >
//           <Text
//             fontSize={wp(4.5)}
//             fontWeight="bold"
//             mb={hp(2)}
//             color={isDarkMode ? '#E5E7EB' : '#1F2937'}
//           >
//             Skills
//           </Text>
//           <HStack space={2} flexWrap="wrap">
//             {entries.length > 0 ? (
//               entries.map((item, index) => (
//                 <Badge
//                   key={index}
//                   bg={isDarkMode ? '#4B5563' : '#BFDBFE'}
//                   borderRadius="full"
//                   px={wp(3)}
//                   py={hp(1)}
//                   _text={{
//                     color: isDarkMode ? '#BFDBFE' : '#2563EB',
//                     fontSize: wp(4),
//                   }}
//                 >
//                   {item}
//                 </Badge>
//               ))
//             ) : (
//               <Text fontSize={wp(4)} color={isDarkMode ? '#E5E7EB' : '#1F2937'}>
//                 No skills listed
//               </Text>
//             )}
//           </HStack>
//         </Box>

//         <Box
//           bg={isDarkMode ? '#374151' : '#FFFFFF'}
//           borderRadius="2xl"
//           p={wp(4)}
//           mb={hp(2)}
//           shadow={4}
//           width="100%"
//         >
//           <Text
//             fontSize={wp(4.5)}
//             fontWeight="bold"
//             mb={hp(2)}
//             color={isDarkMode ? '#E5E7EB' : '#1F2937'}
//           >
//             Professional Experience
//           </Text>
//           <VStack space={2}>
//             {experience.length > 0 ? (
//               experience.map((exp, idx) => (
//                 <Box
//                   key={idx}
//                   bg={isDarkMode ? '#4B5563' : '#E5E7EB'}
//                   borderRadius="lg"
//                   p={wp(3)}
//                   mb={2}
//                 >
//                   <Text
//                     fontSize={wp(4.2)}
//                     fontWeight="bold"
//                     color={isDarkMode ? '#E5E7EB' : '#1F2937'}
//                   >
//                     {exp.designation || 'Not specified'}
//                   </Text>
//                   <Text
//                     fontSize={wp(3.8)}
//                     color={isDarkMode ? '#D1D5DB' : '#4B5563'}
//                   >
//                     {exp.company_organization || 'Not specified'}
//                   </Text>
//                   <Text
//                     fontSize={wp(3.8)}
//                     color={isDarkMode ? '#D1D5DB' : '#4B5563'}
//                   >
//                     {exp.start_date} → {exp.end_date}
//                   </Text>
//                 </Box>
//               ))
//             ) : (
//               <Text fontSize={wp(4)} color={isDarkMode ? '#E5E7EB' : '#1F2937'}>
//                 No professional experience listed
//               </Text>
//             )}
//           </VStack>
//         </Box>
//       </ScrollView>
//       <BottomNavBar />
//     </Box>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollContent: {
//     paddingHorizontal: wp(4),
//     paddingBottom: hp(10),
//   },
// });

// export default ProfileView;

/* eslint-disable react-native/no-inline-styles */
// import React, { useState, useEffect, useContext } from 'react';
// import {
//   Box,
//   HStack,
//   VStack,
//   Avatar,
//   ScrollView,
//   Badge,
//   Text,
// } from 'native-base';
// import { StyleSheet, Dimensions, useColorScheme } from 'react-native';
// import BottomNavBar from '../../Components/NavBar/BottomNav';
// import { CandidateContext } from '../../Context/CandidateContext'; // adjust import

// const { width, height } = Dimensions.get('window');
// const wp = percentage => (width * percentage) / 100;
// const hp = percentage => (height * percentage) / 100;

// const ProfileView = () => {
//   const colorScheme = useColorScheme();
//   const isDarkMode = colorScheme === 'dark';

//   const { candidateData } = useContext(CandidateContext);

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [education, setEducation] = useState([]);
//   const [experience, setExperience] = useState([]);
//   const [resumeUrl, setResumeUrl] = useState('');
//   const [summary, setSummary] = useState('');
//   const [skills, setSkills] = useState([]);
//   const [availability, setAvailability] = useState('');
//   const [totalExp, setTotalExp] = useState('');

//   useEffect(() => {
//     if (candidateData?.data) {
//       console.log('📌 Candidate Data from Context:', candidateData.data);

//       const user = candidateData.data;
//       const resume = user.resume_data;

//       setName(`${user.first_name || ''} ${user.last_name || ''}`);
//       setEmail(user.email || '');
//       setPhone(user.phone_number || '');
//       setResumeUrl(user.resume_url || '');
//       setSummary(resume?.professional_summary || '');
//       setEducation(resume?.education || []);
//       setExperience(resume?.professional_experience || []);
//       setAvailability(resume?.availability || 'Not specified');
//       setTotalExp(resume?.total_exp || '');
//       setSkills(
//         resume?.technical_skills && resume.technical_skills !== 'Not Specified'
//           ? resume.technical_skills.split(',').map(s => s.trim())
//           : [],
//       );
//     }
//   }, [candidateData]);

//   const renderField = (label, value, icon) => (
//     <HStack alignItems="center" space={3} mb={hp(1)}>
//       <Text bold fontSize={wp(4)} color={isDarkMode ? '#E5E7EB' : '#1F2937'}>
//         {icon} {label}:
//       </Text>
//       <Text
//         flex={1}
//         fontSize={wp(4)}
//         color={isDarkMode ? '#E5E7EB' : '#1F2937'}
//       >
//         {value || 'Not provided'}
//       </Text>
//     </HStack>
//   );

//   return (
//     <Box
//       style={[
//         styles.container,
//         { backgroundColor: isDarkMode ? '#1F2937' : '#F3F4F6' },
//       ]}
//     >
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         {/* Header */}
//         <Box
//           bg={isDarkMode ? '#374151' : '#FFFFFF'}
//           borderRadius="2xl"
//           p={wp(4)}
//           mb={hp(2)}
//           shadow={4}
//           alignItems="center"
//         >
//           <Avatar size={wp(24)} mb={hp(2)} bg="blue.400">
//             <Text fontSize={wp(8)} color="white">
//               {name ? name[0] : ''}
//             </Text>
//           </Avatar>
//           <Text
//             fontSize={wp(6)}
//             fontWeight="bold"
//             color={isDarkMode ? '#E5E7EB' : '#1F2937'}
//           >
//             {name || 'No Name'}
//           </Text>
//           <Text
//             fontSize={wp(4)}
//             mt={1}
//             color={isDarkMode ? '#D1D5DB' : '#4B5563'}
//           >
//             {email}
//           </Text>
//         </Box>

//         {/* Resume */}
//         <Box
//           bg={isDarkMode ? '#374151' : '#FFFFFF'}
//           borderRadius="2xl"
//           p={wp(4)}
//           mb={hp(2)}
//           shadow={4}
//         >
//           <Text fontSize={wp(4.5)} fontWeight="bold" mb={2}>
//             Resume
//           </Text>
//           <Text>{resumeUrl || 'No resume uploaded'}</Text>
//         </Box>

//         {/* Profile Summary */}
//         <Box
//           bg={isDarkMode ? '#374151' : '#FFFFFF'}
//           borderRadius="2xl"
//           p={wp(4)}
//           mb={hp(2)}
//           shadow={4}
//         >
//           <Text fontSize={wp(4.5)} fontWeight="bold" mb={2}>
//             Profile Summary
//           </Text>
//           <Text>{summary || 'No summary provided'}</Text>
//         </Box>

//         {/* Basic Details */}
//         <Box
//           bg={isDarkMode ? '#374151' : '#FFFFFF'}
//           borderRadius="2xl"
//           p={wp(4)}
//           mb={hp(2)}
//           shadow={4}
//         >
//           <Text fontSize={wp(4.5)} fontWeight="bold" mb={2}>
//             Basic Details
//           </Text>
//           {renderField('Email', email, '✉️')}
//           {renderField('Phone', phone, '📱')}
//           {renderField('Availability', availability, '📆')}
//           {renderField('Total Exp', totalExp, '💼')}
//         </Box>

//         {/* Education */}
//         <Box
//           bg={isDarkMode ? '#374151' : '#FFFFFF'}
//           borderRadius="2xl"
//           p={wp(4)}
//           mb={hp(2)}
//           shadow={4}
//         >
//           <Text fontSize={wp(4.5)} fontWeight="bold" mb={2}>
//             Education
//           </Text>
//           <VStack space={2}>
//             {education.length > 0 ? (
//               education.map((edu, idx) => (
//                 <Text key={idx}>
//                   {edu.course} - {edu.university} ({edu.year})
//                 </Text>
//               ))
//             ) : (
//               <Text>No education details</Text>
//             )}
//           </VStack>
//         </Box>

//         {/* Experience */}
//         <Box
//           bg={isDarkMode ? '#374151' : '#FFFFFF'}
//           borderRadius="2xl"
//           p={wp(4)}
//           mb={hp(2)}
//           shadow={4}
//         >
//           <Text fontSize={wp(4.5)} fontWeight="bold" mb={2}>
//             Professional Experience
//           </Text>
//           <VStack space={2}>
//             {experience.length > 0 ? (
//               experience.map((exp, idx) => (
//                 <Box
//                   key={idx}
//                   p={2}
//                   bg={isDarkMode ? '#4B5563' : '#E5E7EB'}
//                   borderRadius="lg"
//                 >
//                   <Text fontWeight="bold">{exp.designation}</Text>
//                   <Text>{exp.company_organization}</Text>
//                   <Text>
//                     {exp.start_date} → {exp.end_date}
//                   </Text>
//                 </Box>
//               ))
//             ) : (
//               <Text>No experience details</Text>
//             )}
//           </VStack>
//         </Box>

//         {/* Skills */}
//         <Box
//           bg={isDarkMode ? '#374151' : '#FFFFFF'}
//           borderRadius="2xl"
//           p={wp(4)}
//           mb={hp(2)}
//           shadow={4}
//         >
//           <Text fontSize={wp(4.5)} fontWeight="bold" mb={2}>
//             Skills
//           </Text>
//           <HStack space={2} flexWrap="wrap">
//             {skills.length > 0 ? (
//               skills.map((skill, idx) => (
//                 <Badge
//                   key={idx}
//                   colorScheme="blue"
//                   borderRadius="full"
//                   px={3}
//                   py={1}
//                 >
//                   {skill}
//                 </Badge>
//               ))
//             ) : (
//               <Text>No skills listed</Text>
//             )}
//           </HStack>
//         </Box>
//       </ScrollView>
//       <BottomNavBar />
//     </Box>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   scrollContent: { paddingHorizontal: wp(4), paddingBottom: hp(10) },
// });

// export default ProfileView;

import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  HStack,
  VStack,
  Avatar,
  ScrollView,
  Badge,
  Text,
  Button,
} from 'native-base';
import { StyleSheet, Dimensions, useColorScheme } from 'react-native';
import { CandidateContext } from '../../Context/CandidateContext';

const { width, height } = Dimensions.get('window');
const wp = percentage => (width * percentage) / 100;
const hp = percentage => (height * percentage) / 100;

const ProfileView = ({ navigation = { navigate: () => {} } }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const { candidateData } = useContext(CandidateContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [resumeUrl, setResumeUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [skills, setSkills] = useState([]);
  const [availability, setAvailability] = useState('');
  const [totalExp, setTotalExp] = useState('');

  useEffect(() => {
    if (candidateData) {
      console.log('📌 Candidate Data from Context:', candidateData);

      const user = candidateData;
      const resume = user.resume_data;

      setName(`${user.first_name || ''} ${user.last_name || ''}`);
      setEmail(user.email || '');
      setPhone(user.phone_number || '');
      setResumeUrl(user.resume_url || '');
      setSummary(resume?.professional_summary || '');
      setEducation(resume?.education || []);
      setExperience(resume?.professional_experience || []);
      setAvailability(resume?.availability || 'Not specified');
      setTotalExp(resume?.total_exp || '');
      setSkills(
        resume?.technical_skills && resume.technical_skills !== 'Not Specified'
          ? resume.technical_skills.split(',').map(s => s.trim())
          : [],
      );
    }
  }, [candidateData]);

   const handleSubmit = async () => {
    navigation.navigate('Login');
   }

  const renderField = (label, value, icon) => (
    <HStack alignItems="center" space={3} mb={hp(1)}>
      <Text bold fontSize={wp(4)} color={isDarkMode ? '#E5E7EB' : '#1F2937'}>
        {icon} {label}:
      </Text>
      <Text
        flex={1}
        fontSize={wp(4)}
        color={isDarkMode ? '#E5E7EB' : '#1F2937'}
      >
        {value || 'Not provided'}
      </Text>
    </HStack>
  );

  return (
    <Box
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#1F2937' : '#F3F4F6' },
      ]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Box
          bg={isDarkMode ? '#374151' : '#FFFFFF'}
          borderRadius="2xl"
          p={wp(4)}
          mb={hp(2)}
          shadow={4}
          alignItems="center"
        >
          <Avatar size={wp(24)} mb={hp(2)} bg="blue.400">
            <Text fontSize={wp(8)} color="white">
              {name ? name[0] : ''}
            </Text>
          </Avatar>
          <Text
            fontSize={wp(6)}
            fontWeight="bold"
            color={isDarkMode ? '#E5E7EB' : '#1F2937'}
          >
            {name || 'No Name'}
          </Text>
          <Text
            fontSize={wp(4)}
            mt={1}
            color={isDarkMode ? '#D1D5DB' : '#4B5563'}
          >
            {email}
          </Text>
        </Box>

        {/* Resume */}
        <Box
          bg={isDarkMode ? '#374151' : '#FFFFFF'}
          borderRadius="2xl"
          p={wp(4)}
          mb={hp(2)}
          shadow={4}
        >
          <Text fontSize={wp(4.5)} fontWeight="bold" mb={2}>
            Resume
          </Text>
          <Text>{resumeUrl || 'No resume uploaded'}</Text>
        </Box>

        {/* Profile Summary */}
        <Box
          bg={isDarkMode ? '#374151' : '#FFFFFF'}
          borderRadius="2xl"
          p={wp(4)}
          mb={hp(2)}
          shadow={4}
        >
          <Text fontSize={wp(4.5)} fontWeight="bold" mb={2}>
            Profile Summary
          </Text>
          <Text>{summary || 'No summary provided'}</Text>
        </Box>

        {/* Basic Details */}
        <Box
          bg={isDarkMode ? '#374151' : '#FFFFFF'}
          borderRadius="2xl"
          p={wp(4)}
          mb={hp(2)}
          shadow={4}
        >
          <Text fontSize={wp(4.5)} fontWeight="bold" mb={2}>
            Basic Details
          </Text>
          {renderField('Email', email, '✉️')}
          {renderField('Phone', phone, '📱')}
          {renderField('Availability', availability, '📆')}
          {renderField('Total Exp', totalExp, '💼')}
        </Box>

        {/* Education */}
        <Box
          bg={isDarkMode ? '#374151' : '#FFFFFF'}
          borderRadius="2xl"
          p={wp(4)}
          mb={hp(2)}
          shadow={4}
        >
          <Text fontSize={wp(4.5)} fontWeight="bold" mb={2}>
            Education
          </Text>
          <VStack space={2}>
            {education.length > 0 ? (
              education.map((edu, idx) => (
                <Text key={idx}>
                  {edu.course} - {edu.university} ({edu.year})
                </Text>
              ))
            ) : (
              <Text>No education details</Text>
            )}
          </VStack>
        </Box>

        {/* Experience */}
        <Box
          bg={isDarkMode ? '#374151' : '#FFFFFF'}
          borderRadius="2xl"
          p={wp(4)}
          mb={hp(2)}
          shadow={4}
        >
          <Text fontSize={wp(4.5)} fontWeight="bold" mb={2}>
            Professional Experience
          </Text>
          <VStack space={2}>
            {experience.length > 0 ? (
              experience.map((exp, idx) => (
                <Box
                  key={idx}
                  p={2}
                  bg={isDarkMode ? '#4B5563' : '#E5E7EB'}
                  borderRadius="lg"
                >
                  <Text fontWeight="bold">{exp.designation}</Text>
                  <Text>{exp.company_organization}</Text>
                  <Text>
                    {exp.start_date} → {exp.end_date}
                  </Text>
                </Box>
              ))
            ) : (
              <Text>No experience details</Text>
            )}
          </VStack>
        </Box>

        {/* Skills */}
        <Box
          bg={isDarkMode ? '#374151' : '#FFFFFF'}
          borderRadius="2xl"
          p={wp(4)}
          mb={hp(2)}
          shadow={4}
        >
          <Text fontSize={wp(4.5)} fontWeight="bold" mb={2}>
            Skills
          </Text>
          <HStack space={2} flexWrap="wrap">
            {skills.length > 0 ? (
              skills.map((skill, idx) => (
                <Badge
                  key={idx}
                  colorScheme="blue"
                  borderRadius="full"
                  px={3}
                  py={1}
                >
                  {skill}
                </Badge>
              ))
            ) : (
              <Text>No skills listed</Text>
            )}
          </HStack>
        </Box>
        <Button
          onPress={handleSubmit}
          mode="contained"
          style={styles.submitButton}
          labelStyle={{
            // fontSize: wp(4.5),
            fontWeight: 'bold',
            color: '#FFFFFF',
          }}
        >
          Submit
        </Button>
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: wp(4), paddingBottom: hp(10) },
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

export default ProfileView;
