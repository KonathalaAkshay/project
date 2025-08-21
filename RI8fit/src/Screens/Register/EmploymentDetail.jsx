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

import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { CandidateContext } from '../../Context/CandidateContext'; // adjust path
import { Button, Icon } from 'native-base';
import { MaterialIcons } from 'react-native-vector-icons/MaterialIcons';

const EmploymentDetails = ({ navigation }) => {
  const { candidateData } = useContext(CandidateContext);
  const [experienceList, setExperienceList] = useState([]);

  const handleSubmit = () => {
    navigation.navigate('ProfileView');
  };

  useEffect(() => {
    if (candidateData?.resume_data?.professional_experience?.length) {
      const mapped = candidateData.resume_data.professional_experience.map(
        (exp, idx) => ({
          id: idx.toString(),
          company: exp.company_organization,
          role: exp.designation,
          startDate: exp.start_date,
          endDate: exp.end_date,
        }),
      );
      setExperienceList(mapped);
    }
  }, [candidateData]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <Text style={styles.heading}>Professional Experience</Text>

      {experienceList.length > 0 ? (
        experienceList.map(item => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.company}>{item.company}</Text>
            <Text style={styles.role}>{item.role}</Text>
            <Text style={styles.dates}>
              {item.startDate} → {item.endDate}
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.noData}>No professional experience added</Text>
      )}

      <Button
        onPress={handleSubmit}
        bg="#3B82F6"
        _pressed={{ bg: '#2563EB' }}
        _text={{ color: '#fff', fontWeight: 'bold', letterSpacing: 0.5 }}
        borderRadius="lg"
        px={10}
        py={3}
        // rightIcon={<Icon as={MaterialIconss} name="arrow-forward" size="sm" />}
      >
        Next
      </Button>
    </ScrollView>
  );
};

export default EmploymentDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginVertical: 16,
    textAlign: 'center',
    color: '#2C3E50',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  company: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495E',
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: '#16A085',
    marginBottom: 6,
  },
  dates: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  noData: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginTop: 30,
  },
});
