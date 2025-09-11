// import React, { useState, useContext } from 'react';
// import {
//   View,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import { TextInput, Button, Text, IconButton } from 'react-native-paper';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { CandidateContext } from '../../Context/CandidateContext'; // adjust path

// const { width, height } = Dimensions.get('window');
// const wp = percentage => (width * percentage) / 100;
// const hp = percentage => (height * percentage) / 100;

// const EmploymentDetail = () => {
//   const { setCandidateData } = useContext(CandidateContext); // ✅ use context

//   const [experiences, setExperiences] = useState([
//     {
//       id: Date.now(),
//       company_organization: '',
//       designation: '',
//       startMonth: '',
//       startYear: '',
//       endMonth: '',
//       endYear: '',
//     },
//   ]);

//   const addExperience = () => {
//     setExperiences(prev => [
//       ...prev,
//       {
//         id: Date.now(),
//         company_organization: '',
//         designation: '',
//         startMonth: '',
//         startYear: '',
//         endMonth: '',
//         endYear: '',
//       },
//     ]);
//   };

//   const removeExperience = id => {
//     setExperiences(prev => prev.filter(item => item.id !== id));
//   };

//   const updateExperience = (id, field, value) => {
//     setExperiences(prev =>
//       prev.map(item => (item.id === id ? { ...item, [field]: value } : item)),
//     );
//   };

//   const handleSubmit = () => {
//     const professional_experience = experiences.map(exp => {
//       let endMonth = exp.endMonth;
//       let endYear = exp.endYear;

//       if (
//         endMonth.trim().toLowerCase() === 'present' ||
//         endYear.trim().toLowerCase() === 'present'
//       ) {
//         const now = new Date();
//         endMonth = now.toLocaleString('default', { month: 'long' });
//         endYear = String(now.getFullYear());
//       }

//       return {
//         company_organization: exp.company_organization.trim(),
//         designation: exp.designation.trim(),
//         start_month: exp.startMonth.trim(),
//         start_year: exp.startYear.trim(),
//         end_month: endMonth.trim(),
//         end_year: endYear.trim(),
//       };
//     });

//     const payload = { professional_experience };

//     // ✅ Save to global context
//     setCandidateData(payload);

//     console.log('📤 Stored in Context:', JSON.stringify(payload, null, 2));
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         <Text style={styles.sectionTitle}>Work Experience</Text>

//         {experiences.map((exp, index) => (
//           <View key={exp.id} style={styles.card}>
//             <Text style={styles.cardTitle}>Experience {index + 1}</Text>

//             <TextInput
//               label="Company / Organization"
//               value={exp.company_organization}
//               onChangeText={text =>
//                 updateExperience(exp.id, 'company_organization', text)
//               }
//               style={styles.input}
//               mode="outlined"
//             />
//             <TextInput
//               label="Designation"
//               value={exp.designation}
//               onChangeText={text =>
//                 updateExperience(exp.id, 'designation', text)
//               }
//               style={styles.input}
//               mode="outlined"
//             />

//             <View style={styles.row}>
//               <TextInput
//                 label="Start Month"
//                 value={exp.startMonth}
//                 onChangeText={text =>
//                   updateExperience(exp.id, 'startMonth', text)
//                 }
//                 style={[styles.input, styles.half]}
//                 mode="outlined"
//               />
//               <TextInput
//                 label="Start Year"
//                 value={exp.startYear}
//                 onChangeText={text =>
//                   updateExperience(exp.id, 'startYear', text)
//                 }
//                 style={[styles.input, styles.half]}
//                 mode="outlined"
//                 keyboardType="numeric"
//               />
//             </View>

//             <View style={styles.row}>
//               <TextInput
//                 label="End Month"
//                 placeholder="or type 'Present'"
//                 value={exp.endMonth}
//                 onChangeText={text =>
//                   updateExperience(exp.id, 'endMonth', text)
//                 }
//                 style={[styles.input, styles.half]}
//                 mode="outlined"
//               />
//               <TextInput
//                 label="End Year"
//                 placeholder="or type 'Present'"
//                 value={exp.endYear}
//                 onChangeText={text => updateExperience(exp.id, 'endYear', text)}
//                 style={[styles.input, styles.half]}
//                 mode="outlined"
//                 keyboardType="numeric"
//               />
//             </View>

//             {experiences.length > 1 && (
//               <IconButton
//                 icon={() => (
//                   <MaterialIcons name="delete" size={22} color="#EF4444" />
//                 )}
//                 onPress={() => removeExperience(exp.id)}
//                 style={styles.removeButton}
//               />
//             )}
//           </View>
//         ))}

//         <Button
//           mode="contained"
//           onPress={addExperience}
//           icon="plus"
//           style={styles.addButton}
//         >
//           Add Another Experience
//         </Button>

//         <Button
//           mode="contained"
//           onPress={handleSubmit}
//           style={styles.submitButton}
//         >
//           Save Experiences
//         </Button>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F9FAFB' },
//   scrollContent: { padding: wp(5), paddingBottom: hp(10) },
//   sectionTitle: {
//     fontSize: wp(5),
//     fontWeight: '700',
//     marginBottom: hp(2),
//     color: '#111827',
//   },
//   card: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: wp(4),
//     marginBottom: hp(2),
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   cardTitle: {
//     fontSize: wp(4.2),
//     fontWeight: '600',
//     marginBottom: hp(1.5),
//     color: '#1F2937',
//   },
//   input: {
//     marginBottom: hp(1.5),
//     backgroundColor: '#F3F4F6',
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   half: {
//     width: '48%',
//   },
//   removeButton: {
//     alignSelf: 'flex-end',
//     marginTop: hp(1),
//     backgroundColor: '#FEE2E2',
//     borderRadius: 50,
//   },
//   addButton: {
//     marginVertical: hp(2),
//     backgroundColor: '#2563EB',
//     borderRadius: 12,
//     paddingVertical: hp(1),
//   },
//   submitButton: {
//     marginVertical: hp(1),
//     backgroundColor: '#10B981',
//     borderRadius: 12,
//     paddingVertical: hp(1),
//   },
// });

// export default EmploymentDetail;

import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  ScrollView,
  Text,
  VStack,
  Spinner,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import api from '../../API/api'; // adjust path
import { getItem, ACCESS_TOKEN } from '../../Utils/helper';

const EmploymentDetails = ({ navigation }) => {
  const [experienceList, setExperienceList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch experiences from API
  useEffect(() => {
    const fetchExperiences = async () => {
      setLoading(true);
      try {
        const token = await getItem(ACCESS_TOKEN);
        const response = await api.get('/candidates/get-employment', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const experiences = response.data?.data || [];

        // map for display
        const mapped = experiences.map((exp, idx) => ({
          id: idx.toString(),
          company: exp.company_name || exp.company_organization || '—',
          role: exp.job_title || exp.designation || '—',
          startDate: exp.joining_date || exp.start_date || '—',
          endDate: exp.end_date || 'Present',
        }));

        setExperienceList(mapped);
      } catch (error) {
        console.error(
          'Error fetching experiences:',
          error?.response?.data || error,
        );
        Alert.alert(
          'Error',
          'Failed to fetch experience details. Please try again.',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, [navigation]);

  const handleNext = () => {
    navigation.navigate('CompleteSubmit');
  };

  const handleEdit = async () => {
    try {
      const token = await getItem(ACCESS_TOKEN);
      const response = await api.get('/candidates/get-employment', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const experiences = response.data?.data || [];
      navigation.navigate('EditExperienceScreen', { initial: experiences });
    } catch (error) {
      console.error(
        'Error fetching experiences:',
        error?.response?.data || error,
      );
      Alert.alert(
        'Error',
        'Failed to fetch experience details. Please try again.',
      );
    }
  };

  return (
    <ScrollView flex={1} bg="#F5F6FA" px={4} pb={10}>
      <Heading size="lg" textAlign="center" mt={6} mb={4} color="coolGray.800">
        Professional Experience
      </Heading>

      {loading ? (
        <Spinner size="lg" color="blue.500" mt={10} />
      ) : experienceList.length > 0 ? (
        <VStack space={4} mb={6}>
          {experienceList.map(item => (
            <Box key={item.id} bg="white" rounded="2xl" p={4} shadow={3}>
              <Text fontSize="lg" fontWeight="bold" color="coolGray.900">
                {item.company}
              </Text>
              <Text fontSize="md" color="emerald.600" mb={1}>
                {item.role}
              </Text>
              <Text fontSize="sm" color="coolGray.500">
                {item.startDate} → {item.endDate}
              </Text>
            </Box>
          ))}
        </VStack>
      ) : (
        <Text textAlign="center" color="coolGray.500" fontSize="md" mt={10}>
          No professional experience added
        </Text>
      )}

      <HStack space={4} justifyContent="center" mt={4}>
        <Button
          onPress={handleEdit}
          variant="outline"
          borderColor="#3B82F6"
          _text={{ color: '#3B82F6', fontWeight: 'bold' }}
          leftIcon={
            <Icon as={MaterialIcons} name="edit" size="sm" color="#3B82F6" />
          }
          rounded="lg"
          px={8}
          py={3}
        >
          Edit
        </Button>

        <Button
          onPress={handleNext}
          bg="#3B82F6"
          _pressed={{ bg: '#2563EB' }}
          _text={{ color: '#fff', fontWeight: 'bold' }}
          rightIcon={
            <Icon
              as={MaterialIcons}
              name="arrow-forward"
              size="sm"
              color="white"
            />
          }
          rounded="lg"
          px={8}
          py={3}
        >
          Next
        </Button>
      </HStack>
    </ScrollView>
  );
};

export default EmploymentDetails;
