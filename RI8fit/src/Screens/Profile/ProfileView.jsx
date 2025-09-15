// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Dimensions,
//   Modal,
//   TextInput,
//   TouchableOpacity,
//   Pressable,
//   useColorScheme,
// } from 'react-native';
// import api from '../../API/api';
// import { getItem, ACCESS_TOKEN, setItem } from '../../Utils/helper';

// const { width, height } = Dimensions.get('window');
// const wp = percentage => (width * percentage) / 100;
// const hp = percentage => (height * percentage) / 100;

// const ProfileView = ({ route, navigation }) => {
//   const colorScheme = useColorScheme();
//   const isDarkMode = colorScheme === 'dark';

//   const { candidateData = {} } = route?.params ?? {};

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

//   // Modal states
//   const [showModal, setShowModal] = useState(false);
//   const [modalType, setModalType] = useState(null);
//   const [editValues, setEditValues] = useState({});

//   useEffect(() => {
//     const user = candidateData || {};
//     const resume = user.resume_data || {};

//     const resumeSkills =
//       resume?.technical_skills && resume?.technical_skills !== 'Not Specified'
//         ? Array.isArray(resume.technical_skills)
//           ? resume.technical_skills.map(s => String(s).trim())
//           : String(resume.technical_skills)
//               .split(',')
//               .map(s => s.trim())
//         : [];

//     const employmentSkills =
//       Array.isArray(user.employment) && user.employment.length > 0
//         ? user.employment.flatMap(emp => {
//             if (!emp?.skills_used) return [];
//             if (Array.isArray(emp.skills_used))
//               return emp.skills_used.map(s => String(s).trim());
//             if (typeof emp.skills_used === 'string')
//               return emp.skills_used.split(',').map(s => s.trim());
//             return [];
//           })
//         : [];

//     setName(`${user.full_name || ''} ${user.last_name || ''}`.trim());
//     setEmail(user.email || '');
//     setPhone(user.phone_no || '');
//     setResumeUrl(user.resume_url || '');
//     setSummary(resume?.professional_summary || '');
//     setEducation(Array.isArray(user.education) ? user.education : []);
//     setExperience(
//       Array.isArray(user.employment)
//         ? user.employment.map(exp => ({
//             id: exp.id,
//             job_title: exp.job_title || '',
//             company_name: exp.company_name || '',
//             joining_date: exp.joining_date || '',
//             end_date: exp.end_date || '',
//             duration: exp.duration || '',
//           }))
//         : [],
//     );

//     setAvailability(resume?.availability || 'Not specified');
//     setTotalExp(user.total_exp_years || '');
//     setSkills([...new Set([...resumeSkills, ...employmentSkills])]);
//   }, [candidateData]);

//   const handleChange = (field, value) => {
//     setEditValues(prev => ({ ...prev, [field]: value }));
//   };

//   const openModal = type => {
//     setModalType(type);
//     if (type === 'basic') {
//       setEditValues({ email, phone, availability, totalExp });
//     } else if (type === 'skills') {
//       setEditValues({ skills: skills.join(', ') });
//     } else if (type === 'education') {
//       setEditValues({ education: [...education] });
//     } else if (type === 'experience') {
//       setEditValues({ experience: [...experience] });
//     }
//     setShowModal(true);
//   };

//   // API: update employment
//   const updateEmployment = async (employmentId, updates) => {
//     try {
//       const token = await getItem(ACCESS_TOKEN);
//       if (!token) throw new Error('No token found');

//       const updateEmployment = (employmentId, updates, token) => {
//         return api.put(
//           `/candidates/update-employment/${employmentId}`,
//           updates,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           },
//         );
//       };

//       // usage
//       const response = await updateEmployment(employmentId, updates, token);

//       return { success: true, data: response.data };
//     } catch (error) {
//       console.error(
//         'Error updating employment:',
//         error.response?.data || error.message,
//       );
//       return {
//         success: false,
//         message: error.response?.data?.message || 'Something went wrong',
//       };
//     }
//   };

//   // API: create new employment
//   const createEmployment = async newData => {
//     try {
//       const token = await getItem(ACCESS_TOKEN);
//       if (!token) throw new Error('No token found');

//       // Ensure we have an array
//       const entries = Array.isArray(newData) ? newData : [newData];

//       // Add defaults for missing fields
//       const formattedData = entries.map(item => ({
//         is_current: true,
//         company_name: item.company_name || '',
//         job_title: item.job_title || '',
//         joining_date: item.joining_date || '',
//         end_date: item.end_date || '',
//         duration: item.duration || '',
//       }));

//       const response = await api.post(
//         `/candidates/add-employment`,
//         formattedData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         },
//       );

//       return { success: true, data: response.data };
//     } catch (error) {
//       console.error(
//         'Error creating employment:',
//         error.response?.data || error.message,
//       );
//       return {
//         success: false,
//         message: error.response?.data?.message || 'Something went wrong',
//       };
//     }
//   };

//   const handleSave = async () => {
//     if (modalType === 'basic') {
//       setEmail(editValues.email || '');
//       setPhone(editValues.phone || '');
//       setAvailability(editValues.availability || '');
//       setTotalExp(editValues.totalExp || '');
//     } else if (modalType === 'skills') {
//       setSkills(
//         editValues.skills
//           ? editValues.skills
//               .split(',')
//               .map(s => s.trim())
//               .filter(Boolean)
//           : [],
//       );
//     } else if (modalType === 'education') {
//       setEducation(
//         Array.isArray(editValues.education) ? editValues.education : [],
//       );
//     } else if (modalType === 'experience') {
//       setExperience(
//         Array.isArray(editValues.experience) ? editValues.experience : [],
//       );

//       // Save each employment
//       for (let exp of editValues.experience) {
//         const updates = {};
//         if (exp.job_title) updates.job_title = exp.job_title;
//         if (exp.company_name) updates.company_name = exp.company_name;
//         if (exp.joining_date) updates.joining_date = exp.joining_date;
//         if (exp.end_date) updates.end_date = exp.end_date;
//         if (exp.duration) updates.duration = exp.duration;

//         if (exp.id) {
//           const res = await updateEmployment(exp.id, updates);
//           console.log('Update result:', res);
//         } else {
//           // new → create
//           const res = await createEmployment(updates);
//           console.log('Create result:', res);
//         }
//       }
//     }
//     setShowModal(false);
//   };

//   const handleLogout = () => {
//     navigation?.navigate?.('Login');
//   };

//   const renderField = (label, value) => (
//     <View style={styles.fieldRow}>
//       <Text
//         style={[
//           styles.fieldLabel,
//           { color: isDarkMode ? '#E5E7EB' : '#111827' },
//         ]}
//       >
//         {label}:
//       </Text>
//       <Text
//         style={[
//           styles.fieldValue,
//           { color: isDarkMode ? '#D1D5DB' : '#374151' },
//         ]}
//       >
//         {value || 'Not provided'}
//       </Text>
//     </View>
//   );

//   return (
//     <View
//       style={[
//         styles.container,
//         { backgroundColor: isDarkMode ? '#111827' : '#F9FAFB' },
//       ]}
//     >
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         {/* Header */}
//         <View
//           style={[
//             styles.card,
//             { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' },
//           ]}
//         >
//           <View style={styles.avatar}>
//             <Text style={styles.avatarText}>{name ? name[0] : 'U'}</Text>
//           </View>
//           <Text
//             style={[styles.name, { color: isDarkMode ? '#F3F4F6' : '#111827' }]}
//           >
//             {name || 'No Name'}
//           </Text>
//           <Text
//             style={[
//               styles.email,
//               { color: isDarkMode ? '#D1D5DB' : '#6B7280' },
//             ]}
//           >
//             {email}
//           </Text>
//         </View>

//         {/* Resume */}
//         <View
//           style={[
//             styles.card,
//             { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' },
//           ]}
//         >
//           <Text style={styles.cardTitle}>Resume</Text>
//           <Text>{resumeUrl || 'No resume uploaded'}</Text>
//         </View>

//         {/* Summary */}
//         <View
//           style={[
//             styles.card,
//             { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' },
//           ]}
//         >
//           <Text style={styles.cardTitle}>Profile Summary</Text>
//           <Text>{summary || 'No summary provided'}</Text>
//         </View>

//         {/* Basic Details */}
//         <View
//           style={[
//             styles.card,
//             { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' },
//           ]}
//         >
//           <View style={styles.cardHeader}>
//             <Text style={styles.cardTitle}>Basic Details</Text>
//             <Pressable onPress={() => openModal('basic')}>
//               <Text style={styles.editLink}>Edit</Text>
//             </Pressable>
//           </View>
//           {renderField('Email', email)}
//           {renderField('Phone', phone)}
//           {renderField('Availability', availability)}
//           {renderField('Total Exp', totalExp)}
//         </View>

//         {/* Education */}
//         <View
//           style={[
//             styles.card,
//             { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' },
//           ]}
//         >
//           <View style={styles.cardHeader}>
//             <Text style={styles.cardTitle}>Education</Text>
//             <Pressable onPress={() => openModal('education')}>
//               <Text style={styles.editLink}>Edit</Text>
//             </Pressable>
//           </View>
//           {education?.length > 0 ? (
//             education.map((edu, idx) => (
//               <Text key={idx} style={styles.rowText}>
//                 {edu?.course || '—'} · {edu?.university || '—'} (
//                 {edu?.end_year || '—'})
//               </Text>
//             ))
//           ) : (
//             <Text>No education details</Text>
//           )}
//         </View>

//         {/* Experience */}
//         <View
//           style={[
//             styles.card,
//             { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' },
//           ]}
//         >
//           <View style={styles.cardHeader}>
//             <Text style={styles.cardTitle}>Professional Experience</Text>
//             <Pressable onPress={() => openModal('experience')}>
//               <Text style={styles.editLink}>Edit</Text>
//             </Pressable>
//           </View>
//           {experience?.length > 0 ? (
//             experience.map((exp, idx) => (
//               <View key={idx} style={styles.expBox}>
//                 <Text style={{ fontWeight: 'bold' }}>
//                   {exp?.job_title || '—'}
//                 </Text>
//                 <Text>{exp?.company_name || '—'}</Text>
//                 <Text>
//                   {exp?.joining_date || '—'} → {exp?.end_date || 'Present'}
//                 </Text>
//                 <Text>{exp?.duration || ''}</Text>
//               </View>
//             ))
//           ) : (
//             <Text>No experience details</Text>
//           )}
//         </View>

//         {/* Skills */}
//         <View
//           style={[
//             styles.card,
//             { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' },
//           ]}
//         >
//           <View style={styles.cardHeader}>
//             <Text style={styles.cardTitle}>Skills</Text>
//             <Pressable onPress={() => openModal('skills')}>
//               <Text style={styles.editLink}>Edit</Text>
//             </Pressable>
//           </View>
//           <View style={styles.skillContainer}>
//             {skills?.length > 0 ? (
//               skills.map((skill, idx) => (
//                 <View key={idx} style={styles.skillBadge}>
//                   <Text style={styles.skillText}>{skill}</Text>
//                 </View>
//               ))
//             ) : (
//               <Text>No skills listed</Text>
//             )}
//           </View>
//         </View>

//         {/* Logout */}
//         <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//           <Text style={styles.logoutText}>Logout</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* Edit Modal */}
//       <Modal visible={showModal} animationType="slide" transparent>
//         <View style={styles.modalOverlay}>
//           <View
//             style={[
//               styles.modalContent,
//               { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' },
//             ]}
//           >
//             <Text style={styles.modalTitle}>
//               Edit {modalType?.toUpperCase()}
//             </Text>

//             {modalType === 'basic' && (
//               <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Email"
//                   value={editValues.email}
//                   onChangeText={val => handleChange('email', val)}
//                   keyboardType="email-address"
//                   autoCapitalize="none"
//                 />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Phone"
//                   value={editValues.phone}
//                   onChangeText={val => handleChange('phone', val)}
//                   keyboardType="phone-pad"
//                 />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Availability"
//                   value={editValues.availability}
//                   onChangeText={val => handleChange('availability', val)}
//                 />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Total Experience"
//                   value={editValues.totalExp}
//                   onChangeText={val => handleChange('totalExp', val)}
//                 />
//               </ScrollView>
//             )}

//             {modalType === 'skills' && (
//               <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter skills (comma separated)"
//                   value={editValues.skills}
//                   onChangeText={val => handleChange('skills', val)}
//                   autoCapitalize="none"
//                 />
//               </ScrollView>
//             )}

//             {modalType === 'education' && (
//               <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
//                 {editValues.education?.map((edu, idx) => (
//                   <View key={idx} style={styles.editBox}>
//                     <TextInput
//                       style={styles.input}
//                       placeholder="Course"
//                       value={edu.course}
//                       onChangeText={val => {
//                         const updated = [...editValues.education];
//                         updated[idx] = { ...updated[idx], course: val };
//                         handleChange('education', updated);
//                       }}
//                     />
//                     <TextInput
//                       style={styles.input}
//                       placeholder="University"
//                       value={edu.university}
//                       onChangeText={val => {
//                         const updated = [...editValues.education];
//                         updated[idx] = { ...updated[idx], university: val };
//                         handleChange('education', updated);
//                       }}
//                     />
//                     <TextInput
//                       style={styles.input}
//                       placeholder="End Year"
//                       value={edu.end_year}
//                       onChangeText={val => {
//                         const updated = [...editValues.education];
//                         updated[idx] = { ...updated[idx], end_year: val };
//                         handleChange('education', updated);
//                       }}
//                       keyboardType="numeric"
//                     />
//                     <Pressable
//                       onPress={() => {
//                         const updated = editValues.education.filter(
//                           (_, i) => i !== idx,
//                         );
//                         handleChange('education', updated);
//                       }}
//                     >
//                       <Text style={styles.deleteText}>Delete</Text>
//                     </Pressable>
//                   </View>
//                 ))}
//                 <Pressable
//                   onPress={() =>
//                     handleChange('education', [
//                       ...(editValues.education || []),
//                       { course: '', university: '', end_year: '' },
//                     ])
//                   }
//                 >
//                   <Text style={styles.addText}>+ Add Education</Text>
//                 </Pressable>
//               </ScrollView>
//             )}

//             {modalType === 'experience' && (
//               <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
//                 {editValues.experience?.map((exp, idx) => (
//                   <View key={idx} style={styles.editBox}>
//                     <TextInput
//                       style={styles.input}
//                       placeholder="Job Title"
//                       value={exp.job_title}
//                       onChangeText={val => {
//                         const updated = [...editValues.experience];
//                         updated[idx] = { ...updated[idx], job_title: val };
//                         handleChange('experience', updated);
//                       }}
//                     />
//                     <TextInput
//                       style={styles.input}
//                       placeholder="Company"
//                       value={exp.company_name}
//                       onChangeText={val => {
//                         const updated = [...editValues.experience];
//                         updated[idx] = { ...updated[idx], company_name: val };
//                         handleChange('experience', updated);
//                       }}
//                     />
//                     <TextInput
//                       style={styles.input}
//                       placeholder="Joining Date"
//                       value={exp.joining_date}
//                       onChangeText={val => {
//                         const updated = [...editValues.experience];
//                         updated[idx] = { ...updated[idx], joining_date: val };
//                         handleChange('experience', updated);
//                       }}
//                     />
//                     <TextInput
//                       style={styles.input}
//                       placeholder="End Date"
//                       value={exp.end_date}
//                       onChangeText={val => {
//                         const updated = [...editValues.experience];
//                         updated[idx] = { ...updated[idx], end_date: val };
//                         handleChange('experience', updated);
//                       }}
//                     />
//                     <TextInput
//                       style={styles.input}
//                       placeholder="Duration"
//                       value={exp.duration}
//                       onChangeText={val => {
//                         const updated = [...editValues.experience];
//                         updated[idx] = { ...updated[idx], duration: val };
//                         handleChange('experience', updated);
//                       }}
//                     />
//                     <Pressable
//                       onPress={() => {
//                         const updated = editValues.experience.filter(
//                           (_, i) => i !== idx,
//                         );
//                         handleChange('experience', updated);
//                       }}
//                     >
//                       <Text style={styles.deleteText}>Delete</Text>
//                     </Pressable>
//                   </View>
//                 ))}
//                 <Pressable
//                   onPress={() =>
//                     handleChange('experience', [
//                       ...(editValues.experience || []),
//                       {
//                         job_title: '',
//                         company_name: '',
//                         joining_date: '',
//                         end_date: '',
//                         duration: '',
//                       },
//                     ])
//                   }
//                 >
//                   <Text style={styles.addText}>+ Add Experience</Text>
//                 </Pressable>
//               </ScrollView>
//             )}

//             {/* Footer Buttons */}
//             <View style={styles.modalActions}>
//               <Pressable
//                 onPress={() => setShowModal(false)}
//                 style={styles.cancelBtn}
//               >
//                 <Text style={styles.cancelText}>Cancel</Text>
//               </Pressable>
//               <Pressable onPress={handleSave} style={styles.saveBtn}>
//                 <Text style={styles.saveText}>Save</Text>
//               </Pressable>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   scrollContent: { padding: wp(4), paddingBottom: hp(10) },

//   card: {
//     borderRadius: 12,
//     padding: wp(4),
//     marginBottom: hp(2),
//     elevation: 3,
//   },

//   avatar: {
//     width: wp(24),
//     height: wp(24),
//     borderRadius: wp(12),
//     backgroundColor: '#3B82F6',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: hp(1.5),
//     alignSelf: 'center',
//   },
//   avatarText: { fontSize: wp(8), color: '#FFFFFF', fontWeight: 'bold' },
//   name: { fontSize: wp(6), fontWeight: 'bold', textAlign: 'center' },
//   email: { fontSize: wp(4), textAlign: 'center' },

//   cardTitle: { fontSize: wp(4.5), fontWeight: 'bold', marginBottom: 6 },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 6,
//   },
//   editLink: { color: '#3B82F6', fontWeight: '600' },

//   fieldRow: { flexDirection: 'row', marginBottom: 6 },
//   fieldLabel: { fontWeight: 'bold', fontSize: wp(4), marginRight: 6 },
//   fieldValue: { flex: 1, fontSize: wp(4) },
//   rowText: { marginBottom: 6 },

//   expBox: {
//     padding: 10,
//     borderRadius: 8,
//     backgroundColor: '#E5E7EB',
//     marginBottom: 6,
//   },

//   skillContainer: { flexDirection: 'row', flexWrap: 'wrap' },
//   skillBadge: {
//     backgroundColor: '#E0F2FE',
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 20,
//     marginRight: 6,
//     marginBottom: 6,
//   },
//   skillText: { color: '#0369A1', fontWeight: '500' },

//   logoutButton: {
//     backgroundColor: '#EF4444',
//     paddingVertical: 12,
//     borderRadius: 8,
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   logoutText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: wp(4.2) },

//   // Modal
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: 'rgba(0,0,0,0.6)',
//     padding: 20,
//   },
//   modalContent: { borderRadius: 12, padding: 20 },
//   modalTitle: { fontSize: wp(5), fontWeight: 'bold', marginBottom: 12 },
//   input: {
//     borderWidth: 1,
//     borderColor: '#D1D5DB',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     marginBottom: 12,
//   },
//   editBox: {
//     marginBottom: 12,
//     padding: 8,
//     borderWidth: 1,
//     borderColor: '#DDDDDD',
//     borderRadius: 8,
//   },
//   deleteText: { color: '#EF4444', fontWeight: '600', marginTop: 4 },
//   addText: { color: '#3B82F6', fontWeight: '600', marginTop: 8 },

//   modalActions: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     marginTop: 10,
//   },
//   cancelBtn: { padding: 10, marginRight: 10 },
//   cancelText: { color: '#6B7280' },
//   saveBtn: {
//     backgroundColor: '#3B82F6',
//     paddingVertical: 10,
//     paddingHorizontal: 18,
//     borderRadius: 8,
//   },
//   saveText: { color: '#FFFFFF', fontWeight: '600' },
// });

// export default ProfileView;

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Dimensions,
//   Modal,
//   TextInput,
//   TouchableOpacity,
//   Pressable,
//   useColorScheme,
// } from 'react-native';
// import api from '../../API/api';
// import { getItem, ACCESS_TOKEN } from '../../Utils/helper';

// const { width, height } = Dimensions.get('window');
// const wp = percentage => (width * percentage) / 100;
// const hp = percentage => (height * percentage) / 100;

// const ProfileView = ({ route, navigation }) => {
//   const colorScheme = useColorScheme();
//   const isDarkMode = colorScheme === 'dark';

//   const { candidateData = {} } = route?.params ?? {};

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

//   // Modal states
//   const [showModal, setShowModal] = useState(false);
//   const [editField, setEditField] = useState(null); // { type, index?, value }

//   useEffect(() => {
//     const user = candidateData || {};
//     const resume = user.resume_data || {};

//     const resumeSkills =
//       resume?.technical_skills && resume?.technical_skills !== 'Not Specified'
//         ? Array.isArray(resume.technical_skills)
//           ? resume.technical_skills.map(s => String(s).trim())
//           : String(resume.technical_skills)
//               .split(',')
//               .map(s => s.trim())
//         : [];

//     const employmentSkills =
//       Array.isArray(user.employment) && user.employment.length > 0
//         ? user.employment.flatMap(emp => {
//             if (!emp?.skills_used) return [];
//             if (Array.isArray(emp.skills_used))
//               return emp.skills_used.map(s => String(s).trim());
//             if (typeof emp.skills_used === 'string')
//               return emp.skills_used.split(',').map(s => s.trim());
//             return [];
//           })
//         : [];

//     setName(`${user.full_name || ''} ${user.last_name || ''}`.trim());
//     setEmail(user.email || '');
//     setPhone(user.phone_no || '');
//     setResumeUrl(user.resume_url || '');
//     setSummary(resume?.professional_summary || '');
//     setEducation(Array.isArray(user.education) ? user.education : []);
//     setExperience(
//       Array.isArray(user.employment)
//         ? user.employment.map(exp => ({
//             id: exp.id,
//             job_title: exp.job_title || '',
//             company_name: exp.company_name || '',
//             joining_date: exp.joining_date || '',
//             end_date: exp.end_date || '',
//             duration: exp.duration || '',
//           }))
//         : [],
//     );

//     setAvailability(resume?.availability || 'Not specified');
//     setTotalExp(user.total_exp_years || '');
//     setSkills([...new Set([...resumeSkills, ...employmentSkills])]);
//   }, [candidateData]);

//   // open modal for single field
//   const openFieldModal = (type, value, index = null) => {
//     setEditField({ type, value, index });
//     setShowModal(true);
//   };

//   // save changes for single field
//   const handleFieldSave = () => {
//     if (!editField) return;
//     const { type, value, index } = editField;

//     if (type === 'email') setEmail(value);
//     else if (type === 'phone') setPhone(value);
//     else if (type === 'availability') setAvailability(value);
//     else if (type === 'totalExp') setTotalExp(value);
//     else if (type === 'summary') setSummary(value);
//     else if (type === 'education') {
//       const updated = [...education];
//       updated[index] = { ...updated[index], course: value };
//       setEducation(updated);
//     } else if (type === 'experience_title') {
//       const updated = [...experience];
//       updated[index] = { ...updated[index], job_title: value };
//       setExperience(updated);
//     } else if (type === 'experience_company') {
//       const updated = [...experience];
//       updated[index] = { ...updated[index], company_name: value };
//       setExperience(updated);
//     } else if (type === 'experience_duration') {
//       const updated = [...experience];
//       updated[index] = { ...updated[index], duration: value };
//       setExperience(updated);
//     } else if (type === 'skills') {
//       const updated = [...skills];
//       updated[index] = value;
//       setSkills(updated);
//     }

//     setShowModal(false);
//   };

//   const handleLogout = () => {
//     navigation?.navigate?.('Login');
//   };

//   const renderField = (label, value, type) => (
//     <View style={styles.fieldRow}>
//       <Text
//         style={[
//           styles.fieldLabel,
//           { color: isDarkMode ? '#E5E7EB' : '#111827' },
//         ]}
//       >
//         {label}:
//       </Text>
//       <Text
//         style={[
//           styles.fieldValue,
//           { color: isDarkMode ? '#D1D5DB' : '#374151' },
//         ]}
//       >
//         {value || 'Not provided'}
//       </Text>
//       <Pressable onPress={() => openFieldModal(type, value)}>
//         <Text style={styles.editLink}>Edit</Text>
//       </Pressable>
//     </View>
//   );

//   return (
//     <View
//       style={[
//         styles.container,
//         { backgroundColor: isDarkMode ? '#111827' : '#F9FAFB' },
//       ]}
//     >
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         {/* Header */}
//         <View
//           style={[
//             styles.card,
//             { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' },
//           ]}
//         >
//           <View style={styles.avatar}>
//             <Text style={styles.avatarText}>{name ? name[0] : 'U'}</Text>
//           </View>
//           <Text
//             style={[styles.name, { color: isDarkMode ? '#F3F4F6' : '#111827' }]}
//           >
//             {name || 'No Name'}
//           </Text>
//           <Text
//             style={[
//               styles.email,
//               { color: isDarkMode ? '#D1D5DB' : '#6B7280' },
//             ]}
//           >
//             {email}
//           </Text>
//         </View>

//         {/* Resume */}
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Resume</Text>
//           <Text>{resumeUrl || 'No resume uploaded'}</Text>
//         </View>

//         {/* Summary */}
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Profile Summary</Text>
//           <Text>{summary || 'No summary provided'}</Text>
//           <Pressable onPress={() => openFieldModal('summary', summary)}>
//             <Text style={styles.editLink}>Edit</Text>
//           </Pressable>
//         </View>

//         {/* Basic Details */}
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Basic Details</Text>
//           {renderField('Email', email, 'email')}
//           {renderField('Phone', phone, 'phone')}
//           {renderField('Availability', availability, 'availability')}
//           {renderField('Total Exp', totalExp, 'totalExp')}
//         </View>

//         {/* Education */}
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Education</Text>
//           {education?.length > 0 ? (
//             education.map((edu, idx) => (
//               <View key={idx} style={styles.row}>
//                 <Text>
//                   {edu?.course || '—'} · {edu?.university || '—'} (
//                   {edu?.end_year || '—'})
//                 </Text>
//                 <Pressable
//                   onPress={() => openFieldModal('education', edu.course, idx)}
//                 >
//                   <Text style={styles.editLink}>Edit</Text>
//                 </Pressable>
//               </View>
//             ))
//           ) : (
//             <Text>No education details</Text>
//           )}
//         </View>

//         {/* Experience */}
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Professional Experience</Text>
//           {experience?.length > 0 ? (
//             experience.map((exp, idx) => (
//               <View key={idx} style={styles.expBox}>
//                 <Text style={{ fontWeight: 'bold' }}>
//                   {exp?.job_title || '—'}
//                 </Text>
//                 <Pressable
//                   onPress={() =>
//                     openFieldModal('experience_title', exp.job_title, idx)
//                   }
//                 >
//                   <Text style={styles.editLink}>Edit Title</Text>
//                 </Pressable>

//                 <Text>{exp?.company_name || '—'}</Text>
//                 <Pressable
//                   onPress={() =>
//                     openFieldModal(
//                       'experience_company',
//                       exp.company_name,
//                       idx,
//                     )
//                   }
//                 >
//                   <Text style={styles.editLink}>Edit Company</Text>
//                 </Pressable>

//                 <Text>
//                   {exp?.joining_date || '—'} → {exp?.end_date || 'Present'}
//                 </Text>
//                 <Text>{exp?.duration || ''}</Text>
//                 <Pressable
//                   onPress={() =>
//                     openFieldModal('experience_duration', exp.duration, idx)
//                   }
//                 >
//                   <Text style={styles.editLink}>Edit Duration</Text>
//                 </Pressable>
//               </View>
//             ))
//           ) : (
//             <Text>No experience details</Text>
//           )}
//         </View>

//         {/* Skills */}
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Skills</Text>
//           <View style={styles.skillContainer}>
//             {skills?.length > 0 ? (
//               skills.map((skill, idx) => (
//                 <View key={idx} style={styles.skillBadge}>
//                   <Text style={styles.skillText}>{skill}</Text>
//                   <Pressable
//                     onPress={() => openFieldModal('skills', skill, idx)}
//                   >
//                     <Text style={styles.editLink}>Edit</Text>
//                   </Pressable>
//                 </View>
//               ))
//             ) : (
//               <Text>No skills listed</Text>
//             )}
//           </View>
//         </View>

//         {/* Logout */}
//         <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//           <Text style={styles.logoutText}>Logout</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* Edit Modal */}
//       <Modal visible={showModal} animationType="slide" transparent>
//         <View style={styles.modalOverlay}>
//           <View
//             style={[
//               styles.modalContent,
//               { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' },
//             ]}
//           >
//             <Text style={styles.modalTitle}>
//               Edit {editField?.type?.toUpperCase()}
//             </Text>
//             <TextInput
//               style={styles.input}
//               value={editField?.value || ''}
//               onChangeText={val =>
//                 setEditField(prev => ({ ...prev, value: val }))
//               }
//             />

//             <View style={styles.modalActions}>
//               <Pressable
//                 onPress={() => setShowModal(false)}
//                 style={styles.cancelBtn}
//               >
//                 <Text style={styles.cancelText}>Cancel</Text>
//               </Pressable>
//               <Pressable onPress={handleFieldSave} style={styles.saveBtn}>
//                 <Text style={styles.saveText}>Save</Text>
//               </Pressable>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   scrollContent: { padding: wp(4), paddingBottom: hp(10) },

//   card: {
//     borderRadius: 12,
//     padding: wp(4),
//     marginBottom: hp(2),
//     elevation: 3,
//     backgroundColor: '#fff',
//   },

//   avatar: {
//     width: wp(24),
//     height: wp(24),
//     borderRadius: wp(12),
//     backgroundColor: '#3B82F6',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: hp(1.5),
//     alignSelf: 'center',
//   },
//   avatarText: { fontSize: wp(8), color: '#FFFFFF', fontWeight: 'bold' },
//   name: { fontSize: wp(6), fontWeight: 'bold', textAlign: 'center' },
//   email: { fontSize: wp(4), textAlign: 'center' },

//   cardTitle: { fontSize: wp(4.5), fontWeight: 'bold', marginBottom: 6 },
//   editLink: { color: '#3B82F6', fontWeight: '600', marginLeft: 10 },

//   fieldRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 6,
//   },
//   fieldLabel: { fontWeight: 'bold', fontSize: wp(4), marginRight: 6 },
//   fieldValue: { flex: 1, fontSize: wp(4) },

//   row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },

//   expBox: {
//     padding: 10,
//     borderRadius: 8,
//     backgroundColor: '#E5E7EB',
//     marginBottom: 6,
//   },

//   skillContainer: { flexDirection: 'row', flexWrap: 'wrap' },
//   skillBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#E0F2FE',
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 20,
//     marginRight: 6,
//     marginBottom: 6,
//   },
//   skillText: { color: '#0369A1', fontWeight: '500' },

//   logoutButton: {
//     backgroundColor: '#EF4444',
//     paddingVertical: 12,
//     borderRadius: 8,
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   logoutText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: wp(4.2) },

//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: 'rgba(0,0,0,0.6)',
//     padding: 20,
//   },
//   modalContent: { borderRadius: 12, padding: 20 },
//   modalTitle: { fontSize: wp(5), fontWeight: 'bold', marginBottom: 12 },
//   input: {
//     borderWidth: 1,
//     borderColor: '#D1D5DB',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     marginBottom: 12,
//   },
//   modalActions: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     marginTop: 10,
//   },
//   cancelBtn: { padding: 10, marginRight: 10 },
//   cancelText: { color: '#6B7280' },
//   saveBtn: {
//     backgroundColor: '#3B82F6',
//     paddingVertical: 10,
//     paddingHorizontal: 18,
//     borderRadius: 8,
//   },
//   saveText: { color: '#FFFFFF', fontWeight: '600' },
// });

// export default ProfileView;

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Dimensions,
//   Modal,
//   TextInput,
//   TouchableOpacity,
//   Pressable,
//   useColorScheme,
//   Alert,
// } from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import api from '../../API/api';
// import { getItem, ACCESS_TOKEN } from '../../Utils/helper';
// import BottomNavBar from '../../Components/NavBar/BottomNav';

// const { width, height } = Dimensions.get('window');
// const wp = percentage => (width * percentage) / 100;
// const hp = percentage => (height * percentage) / 100;

// const ProfileView = ({ route, navigation }) => {
//   const colorScheme = useColorScheme();
//   const isDarkMode = colorScheme === 'dark';

//   const { candidateData = {} } = route?.params ?? {};

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

//   // Modal states
//   const [showModal, setShowModal] = useState(false);
//   const [editField, setEditField] = useState(null);
//   const [editExperience, setEditExperience] = useState(null);
//   const [activeExpIndex, setActiveExpIndex] = useState(null);

//   useEffect(() => {
//     const user = candidateData || {};
//     const resume = user.resume_data || {};

//     const resumeSkills =
//       resume?.technical_skills && resume?.technical_skills !== 'Not Specified'
//         ? Array.isArray(resume.technical_skills)
//           ? resume.technical_skills.map(s => String(s).trim())
//           : String(resume.technical_skills)
//               .split(',')
//               .map(s => s.trim())
//         : [];

//     const employmentSkills =
//       Array.isArray(user.employment) && user.employment.length > 0
//         ? user.employment.flatMap(emp => {
//             if (!emp?.skills_used) return [];
//             if (Array.isArray(emp.skills_used))
//               return emp.skills_used.map(s => String(s).trim());
//             if (typeof emp.skills_used === 'string')
//               return emp.skills_used.split(',').map(s => s.trim());
//             return [];
//           })
//         : [];

//     setName(`${user.full_name || ''} ${user.last_name || ''}`.trim());
//     setEmail(user.email || '');
//     setPhone(user.phone_no || '');
//     setResumeUrl(user.resume_url || '');
//     setSummary(resume?.professional_summary || '');
//     setEducation(Array.isArray(user.education) ? user.education : []);
//     setExperience(
//       Array.isArray(user.employment)
//         ? user.employment.map(exp => ({
//             id: exp.id,
//             job_title: exp.job_title || '',
//             company_name: exp.company_name || '',
//             joining_date: exp.joining_date || '',
//             end_date: exp.end_date || '',
//             duration: exp.duration || '',
//           }))
//         : [],
//     );

//     setAvailability(resume?.availability || 'Not specified');
//     setTotalExp(user.total_exp_years || '');
//     setSkills([...new Set([...resumeSkills, ...employmentSkills])]);
//   }, [candidateData]);

//   const openFieldModal = (type, value, index = null) => {
//     setEditField({ type, value, index });
//     setShowModal(true);
//   };

//   const openExperienceModal = (exp, index) => {
//     setActiveExpIndex(index);
//     setEditExperience({ ...exp });
//     setShowModal(true);
//     setEditField(null);
//   };

//   const handleSave = async () => {
//     let updatedExperience = [...experience];
//     let updatedEducation = [...education];

//     if (editField) {
//       const { type, value, index } = editField;
//       if (type === 'email') setEmail(value);
//       else if (type === 'phone') setPhone(value);
//       else if (type === 'availability') setAvailability(value);
//       else if (type === 'totalExp') setTotalExp(value);
//       else if (type === 'summary') setSummary(value);
//       else if (type === 'education') {
//         updatedEducation[index] = { ...updatedEducation[index], course: value };
//         setEducation(updatedEducation);
//       }
//     } else if (editExperience && activeExpIndex !== null) {
//       updatedExperience[activeExpIndex] = { ...editExperience };
//       setExperience(updatedExperience);
//     }

//     setShowModal(false);

//     try {
//       const token = await getItem(ACCESS_TOKEN);
//       const payload = { employment_details: updatedExperience };

//       if (editExperience?.id) {
//         await api.put(
//           `/candidates/update-employment/${editExperience.id}`,
//           payload,
//           { headers: { Authorization: `Bearer ${token}` } },
//         );
//         Alert.alert('Success', 'Profile updated successfully');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to update profile');
//     }
//   };

//   const handleDeleteSkill = index => {
//     const updated = [...skills];
//     updated.splice(index, 1);
//     setSkills(updated);
//   };

//   const handleLogout = () => {
//     navigation?.navigate?.('Login');
//   };

//   const renderField = (label, value, type) => (
//     <View style={styles.fieldRow}>
//       <MaterialIcons name="edit" size={18} color="#3B82F6" />
//       <Text
//         style={[
//           styles.fieldLabel,
//           { color: isDarkMode ? '#E5E7EB' : '#111827' },
//         ]}
//       >
//         {label}:
//       </Text>
//       <Text
//         style={[
//           styles.fieldValue,
//           { color: isDarkMode ? '#D1D5DB' : '#374151' },
//         ]}
//       >
//         {value || 'Not provided'}
//       </Text>
//       <Pressable onPress={() => openFieldModal(type, value)}>
//         <MaterialIcons name="edit" size={20} color="#3B82F6" />
//       </Pressable>
//     </View>
//   );

//   return (
//     <View
//       style={[
//         styles.container,
//         { backgroundColor: isDarkMode ? '#111827' : '#bedaf5ff' },
//       ]}
//     >
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         {/* Header */}
//         <View
//           style={[
//             styles.card,
//             styles.headerCard,
//             { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' },
//           ]}
//         >
//           <View style={styles.avatar}>
//             <Text style={styles.avatarText}>{name ? name[0] : 'U'}</Text>
//           </View>
//           <Text
//             style={[styles.name, { color: isDarkMode ? '#F3F4F6' : '#111827' }]}
//           >
//             {name || 'No Name'}
//           </Text>
//           <Text
//             style={[
//               styles.email,
//               { color: isDarkMode ? '#9CA3AF' : '#6B7280' },
//             ]}
//           >
//             {email}
//           </Text>
//         </View>

//         {/* Resume */}
//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}> Resume</Text>

//           <Text style={styles.sectionTitle}>📄 Resume</Text>

//           <Text style={styles.valueText}>
//             {resumeUrl || 'No resume uploaded'}
//           </Text>
//         </View>

//         {/* Summary */}
//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}> Profile Summary</Text>

//           <Text style={styles.sectionTitle}>📝 Profile Summary</Text>
//           <Text style={styles.valueText}>
//             {summary || 'No summary provided'}
//           </Text>
//           <Pressable onPress={() => openFieldModal('summary', summary)}>
//             <MaterialIcons name="edit" size={20} color="#3B82F6" />
//           </Pressable>
//         </View>

//         {/* Basic Details */}
//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}> Basic Details</Text>

//           <Text style={styles.sectionTitle}>ℹ️ Basic Details</Text>
//           {renderField('Email', email, 'email')}
//           {renderField('Phone', phone, 'phone')}
//           {renderField('Availability', availability, 'availability')}
//           {renderField('Total Exp', totalExp, 'totalExp')}
//         </View>

//         {/* Education */}
//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}> Education</Text>

//           <Text style={styles.sectionTitle}>🎓 Education</Text>
//           {education?.length > 0 ? (
//             education.map((edu, idx) => (
//               <View key={idx} style={styles.row}>
//                 <Text>{edu?.course || '—'}</Text>
//                 <Text>{edu?.university || '—'}</Text>
//                 <Text>{edu?.end_year || '—'}</Text>
//                 <Pressable
//                   onPress={() => openFieldModal('education', edu.course, idx)}
//                 >
//                   <MaterialIcons name="edit" size={20} color="#3B82F6" />
//                 </Pressable>
//               </View>
//             ))
//           ) : (
//             <Text style={styles.valueText}>No education details</Text>
//           )}
//         </View>

//         {/* Experience */}
//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}> Professional Experience</Text>
//           <Text style={styles.sectionTitle}>💼 Professional Experience</Text>
//           {experience?.length > 0 ? (
//             experience.map((exp, idx) => (
//               <View key={idx} style={styles.expBox}>
//                 <Text style={styles.expTitle}>{exp?.job_title || '—'}</Text>
//                 <Text>{exp?.company_name || '—'}</Text>
//                 <Text>
//                   {exp?.joining_date || '—'} → {exp?.end_date || 'Present'}
//                 </Text>
//                 <Pressable onPress={() => openExperienceModal(exp, idx)}>
//                   <MaterialIcons name="edit" size={20} color="#3B82F6" />
//                 </Pressable>
//               </View>
//             ))
//           ) : (
//             <Text style={styles.valueText}>No experience details</Text>
//           )}
//         </View>

//         {/* Skills */}
//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Skills</Text>

//           <Text style={styles.sectionTitle}>🛠 Skills</Text>
//           <View style={styles.skillContainer}>
//             {skills?.length > 0 ? (
//               skills.map((skill, idx) => (
//                 <View key={idx} style={styles.skillBadge}>
//                   <Text style={styles.skillText}>{skill}</Text>
//                   <Pressable onPress={() => handleDeleteSkill(idx)}>
//                     <MaterialIcons
//                       name="close"
//                       size={16}
//                       color="#EF4444"
//                       style={{ marginLeft: 6 }}
//                     />
//                   </Pressable>
//                 </View>
//               ))
//             ) : (
//               <Text style={styles.valueText}>No skills listed</Text>
//             )}
//           </View>
//         </View>

//         {/* Logout */}
//         <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//           <MaterialIcons name="logout" size={20} color="#fff" />
//           <Text style={styles.logoutText}>Logout</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       <BottomNavBar />

//       {/* Modal */}
//       <Modal visible={showModal} animationType="slide" transparent>
//         <View style={styles.modalOverlay}>
//           <View
//             style={[
//               styles.modalContent,
//               { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' },
//             ]}
//           >
//             {editField ? (
//               <>
//                 <Text style={styles.modalTitle}>Edit {editField?.type}</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={editField?.value || ''}
//                   onChangeText={val =>
//                     setEditField(prev => ({ ...prev, value: val }))
//                   }
//                 />
//               </>
//             ) : editExperience ? (
//               <>
//                 <Text style={styles.modalTitle}>Edit Experience</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={editExperience.job_title}
//                   onChangeText={val =>
//                     setEditExperience(prev => ({ ...prev, job_title: val }))
//                   }
//                   placeholder="Job Title"
//                 />
//                 <TextInput
//                   style={styles.input}
//                   value={editExperience.company_name}
//                   onChangeText={val =>
//                     setEditExperience(prev => ({ ...prev, company_name: val }))
//                   }
//                   placeholder="Company Name"
//                 />
//               </>
//             ) : null}

//             <View style={styles.modalActions}>
//               <Pressable
//                 onPress={() => setShowModal(false)}
//                 style={styles.cancelBtn}
//               >
//                 <Text style={styles.cancelText}>Cancel</Text>
//               </Pressable>
//               <Pressable onPress={handleSave} style={styles.saveBtn}>
//                 <Text style={styles.saveText}>Save</Text>
//               </Pressable>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   scrollContent: { padding: wp(4), paddingBottom: hp(10) },
//   card: {
//     borderRadius: 12,
//     padding: wp(4),
//     marginBottom: hp(2),
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   headerCard: { alignItems: 'center' },
//   avatar: {
//     width: wp(22),
//     height: wp(22),
//     borderRadius: wp(11),
//     backgroundColor: '#3B82F6',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: hp(1.5),
//   },
//   avatarText: { fontSize: wp(8), color: '#fff', fontWeight: 'bold' },
//   name: { fontSize: wp(6), fontWeight: 'bold' },
//   email: { fontSize: wp(4), marginTop: 4 },
//   sectionTitle: {
//     fontSize: wp(5),
//     fontWeight: '600',
//     marginBottom: 12,
//     lineHeight: wp(6.5),
//     color: '#333',
//   },

//   valueText: { fontSize: wp(4), color: '#374151' },
//   fieldRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//     justifyContent: 'space-between',
//   },

//   valueText: { fontSize: wp(4), color: '#374151' },
//   editLink: { color: '#3B82F6', fontWeight: '600', marginTop: 6 },
//   fieldRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },

//   fieldLabel: { fontWeight: '600', fontSize: wp(4), marginHorizontal: 6 },
//   fieldValue: { flex: 1, fontSize: wp(4) },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 6,
//     alignItems: 'center',
//   },
//   expBox: {
//     padding: 10,
//     borderRadius: 8,
//     backgroundColor: '#F3F4F6',
//     marginBottom: 6,
//   },
//   expTitle: { fontWeight: '600', fontSize: wp(4.2), marginBottom: 4 },
//   skillContainer: { flexDirection: 'row', flexWrap: 'wrap' },
//   skillBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#E0F2FE',
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 20,
//     marginRight: 6,
//     marginBottom: 6,
//   },
//   skillText: { color: '#0369A1', fontWeight: '500' },
//   logoutButton: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#EF4444',
//     paddingVertical: 12,
//     borderRadius: 8,
//     marginTop: 20,
//   },
//   logoutText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: wp(4),
//     marginLeft: 6,
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: 'rgba(0,0,0,0.6)',
//     padding: 20,
//   },
//   modalContent: { borderRadius: 12, padding: 20 },
//   modalTitle: { fontSize: wp(5), fontWeight: 'bold', marginBottom: 12 },
//   input: {
//     borderWidth: 1,
//     borderColor: '#D1D5DB',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     marginBottom: 12,
//   },
//   modalActions: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     marginTop: 10,
//   },
//   cancelBtn: { padding: 10, marginRight: 10 },
//   cancelText: { color: '#6B7280' },
//   saveBtn: {
//     backgroundColor: '#3B82F6',
//     paddingVertical: 10,
//     paddingHorizontal: 18,
//     borderRadius: 8,
//   },
//   saveText: { color: '#fff', fontWeight: '600' },
// });

// export default ProfileView;

// screens/Profile/ProfileView.js
import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Pressable,
  useColorScheme,
  Alert,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BottomNavBar from '../../Components/NavBar/BottomNav';
import api from '../../API/api';
import { getItem, ACCESS_TOKEN } from '../../Utils/helper';
import { useAuth } from '../../Context/AuthContext';
import { Link, HStack, Box } from 'native-base';

const { width, height } = Dimensions.get('window');
const wp = p => (width * p) / 100;
const hp = p => (height * p) / 100;

const ProfileView = ({ route, navigation }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { logout } = useAuth();

  const inputCandidate = route?.params?.candidateData ?? {};
  const [refreshing, setRefreshing] = useState(false);

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

  const deriveSkills = useCallback(user => {
    const resume = user?.resume_data ?? {};
    const resumeSkills =
      resume?.technical_skills && resume?.technical_skills !== 'Not Specified'
        ? Array.isArray(resume.technical_skills)
          ? resume.technical_skills.map(s => String(s).trim())
          : String(resume.technical_skills)
              .split(',')
              .map(s => s.trim())
        : [];

    const employmentSkills =
      Array.isArray(user?.employment) && user.employment.length > 0
        ? user.employment.flatMap(emp => {
            if (!emp?.skills_used) return [];
            if (Array.isArray(emp.skills_used))
              return emp.skills_used.map(s => String(s).trim());
            if (typeof emp.skills_used === 'string')
              return emp.skills_used.split(',').map(s => s.trim());
            return [];
          })
        : [];

    return Array.from(new Set([...resumeSkills, ...employmentSkills]));
  }, []);

  const populateFromCandidate = useCallback(
    user => {
      const resume = user?.resume_data ?? {};
      setName(`${user?.full_name || ''} ${user?.last_name || ''}`.trim());
      setEmail(user?.email || '');
      setPhone(user?.phone_no || '');
      setResumeUrl(user?.resume_url || '');
      setSummary(resume?.professional_summary || '');
      setEducation(Array.isArray(user?.education) ? user.education : []);
      setExperience(
        Array.isArray(user?.employment)
          ? user.employment.map(exp => ({
              id: exp?.id,
              job_title: exp?.job_title || '',
              company_name: exp?.company_name || '',
              joining_date: exp?.joining_date || '',
              end_date: exp?.end_date || '',
              duration: exp?.duration || '',
            }))
          : [],
      );
      setAvailability(resume?.availability || 'Not specified');
      setTotalExp(user?.total_exp_years || '');
      setSkills(deriveSkills(user));
    },
    [deriveSkills],
  );

  // Apply any "updated"
  const applyRouteParamUpdates = useCallback(() => {
    const p = route?.params;
    if (!p) return;

    if (p.updatedBasic) {
      const {
        email: e,
        phone: ph,
        availability: a,
        totalExp: t,
        summary: s,
      } = p.updatedBasic;
      setEmail(e ?? '');
      setPhone(ph ?? '');
      setAvailability(a ?? '');
      setTotalExp(t ?? '');
      setSummary(s ?? '');
    }
    if (p.updatedEducation) {
      setEducation(p.updatedEducation);
    }
    if (p.updatedExperience) {
      const updated = p.updatedExperience;
      setExperience(updated);
      syncEmployment(updated).catch(() => {});
    }
    if (p.updatedSkills) {
      setSkills(p.updatedSkills);
    }
  }, [route?.params]);

  //Refresh
  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const token = await getItem(ACCESS_TOKEN);
      const response = await api.get(
        '/candidate/get-candidates-complete-details',
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const freshCandidate = response.data?.data ?? {};
      populateFromCandidate(freshCandidate);
      applyRouteParamUpdates();
    } catch (e) {
      console.warn('Refresh error:', e);
      Alert.alert('Error', 'Failed to refresh profile. Please try again.');
    } finally {
      setRefreshing(false);
    }
  }, [populateFromCandidate, applyRouteParamUpdates]);

  //Auto refresh
  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  //Employment sync flow unchanged
  const syncEmployment = useCallback(async employmentDetails => {
    try {
      const token = await getItem(ACCESS_TOKEN);
      await api.put(
        '/candidates/update-employment-bulk',
        { employment_details: employmentDetails },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      Alert.alert('Success', 'Experience updated successfully');
    } catch (error) {
      try {
        const token = await getItem(ACCESS_TOKEN);
        for (const exp of employmentDetails) {
          if (exp?.id) {
            await api.put(
              `/candidates/update-employment/${exp.id}`,
              { employment_details: [exp] },
              { headers: { Authorization: `Bearer ${token}` } },
            );
          }
        }
        Alert.alert('Success', 'Experience updated successfully');
      } catch (e2) {
        Alert.alert('Error', 'Failed to update experience');
      }
    }
  }, []);

  const goEditResume = useCallback(() => {
    navigation.navigate('EditResumeScreen', { initialUrl: resumeUrl });
  }, [navigation, resumeUrl]);

  const goEditBasic = useCallback(async () => {
    try {
      const token = await getItem(ACCESS_TOKEN);

      if (!token) {
        throw new Error('No access token found');
      }

      const response = await api.get('/candidates/get-personal-details', {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Personal details:', response.data);

      const details = response.data?.data || [];
      navigation.navigate('EditBasicDetailsScreen', {
        initial: details,
        currentEmail: email,
        currentPhone: phone,
      });
    } catch (error) {
      console.error('Error fetching personal details:', error);
      Alert.alert(
        'Error',
        error.message || 'Failed to fetch personal details. Please try again.',
      );
    }
  }, [navigation, email, phone]);

  const goEditEducation = useCallback(async () => {
    try {
      const token = await getItem(ACCESS_TOKEN);
      const response = await api.get('/candidates/get-education', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const educations = response.data?.data || [];
      navigation.navigate('EditEducationScreen', { initial: educations });
    } catch (error) {
      console.error('Error fetching education:', error);
      Alert.alert(
        'Error',
        'Failed to fetch education details. Please try again.',
      );
    }
  }, [navigation]);

  const goEditExperience = useCallback(async () => {
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
  }, [navigation]);

  const goEditSkills = useCallback(() => {
    navigation.navigate('EditSkillsScreen', { initial: skills });
  }, [navigation, skills]);

  const handleLogout = useCallback(() => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Yes', onPress: logout },
    ]);
  }, [logout]);

  const renderFieldRow = useCallback(
    (label, value) => (
      <View style={styles.fieldRow}>
        <Text
          style={[styles.fieldLabel, { color: isDark ? '#E5E7EB' : '#111827' }]}
        >
          {label}:
        </Text>
        <Text
          style={[styles.fieldValue, { color: isDark ? '#D1D5DB' : '#374151' }]}
        >
          {String(value ?? '').trim() || 'Not provided'}
        </Text>
      </View>
    ),
    [isDark],
  );

  const refreshControl = useMemo(
    () => (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={refresh}
        tintColor={isDark ? '#ffffff' : '#000000'}
      />
    ),
    [refreshing, refresh, isDark],
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? '#111827' : '#bedaf5ff' },
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={refreshControl}
      >
        <View
          style={[
            styles.card,
            styles.headerCard,
            { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' },
          ]}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {name ? name.charAt(0).toUpperCase() : 'U'}
            </Text>
          </View>
          <Text
            style={[styles.name, { color: isDark ? '#F3F4F6' : '#111827' }]}
          >
            {name || 'No Name'}
          </Text>
          <Text
            style={[styles.email, { color: isDark ? '#9CA3AF' : '#6B7280' }]}
          >
            {email}
          </Text>
        </View>

        {/* Resume */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Resume</Text>
          {resumeUrl ? (
            <HStack alignItems="center" justifyContent="space-between">
              <Link
                href={resumeUrl}
                isExternal
                _text={{
                  color: 'blue.500',
                  textDecorationLine: 'underline',
                  fontSize: 'md',
                }}
              >
                View Resume
              </Link>

              <Box>
                <Pressable onPress={goEditResume} hitSlop={8}>
                  <MaterialIcons name="edit" size={20} color="#3B82F6" />
                </Pressable>
              </Box>
            </HStack>
          ) : (
            <HStack alignItems="center" justifyContent="space-between">
              <Text style={styles.valueText}>No resume uploaded</Text>
              <Box>
                <Pressable onPress={goEditResume} hitSlop={8}>
                  <MaterialIcons name="edit" size={20} color="#3B82F6" />
                </Pressable>
              </Box>
            </HStack>
          )}
        </View>

        {/* Profile Summary */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Profile Summary</Text>
            <Pressable onPress={goEditBasic} hitSlop={8}>
              <MaterialIcons name="edit" size={20} color="#3B82F6" />
            </Pressable>
          </View>
          <Text style={styles.valueText}>
            {summary || 'No summary provided'}
          </Text>
        </View>

        {/* Basic Details */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Basic Details</Text>
            <Pressable onPress={goEditBasic} hitSlop={8}>
              <MaterialIcons name="edit" size={20} color="#3B82F6" />
            </Pressable>
          </View>
          {renderFieldRow('Email', email)}
          {renderFieldRow('Phone', phone)}
          {renderFieldRow('Availability', availability)}
          {renderFieldRow('Total Exp', totalExp)}
        </View>

        {/* Education */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Education</Text>
            <Pressable onPress={goEditEducation} hitSlop={8}>
              <MaterialIcons name="edit" size={20} color="#3B82F6" />
            </Pressable>
          </View>

          {education?.length ? (
            education.map((edu, idx) => (
              <View key={idx} style={styles.eduItem}>
                <Text style={styles.eduText}>{edu?.course || '—'}</Text>
                <Text style={styles.eduText}>{edu?.university || '—'}</Text>
                <Text style={[styles.eduText, { marginBottom: 8 }]}>
                  {edu?.start_year + ' - ' + edu?.end_year || '—'}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.valueText}>No education details</Text>
          )}
        </View>

        {/* Experience */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            <Pressable onPress={goEditExperience} hitSlop={8}>
              <MaterialIcons name="edit" size={20} color="#3B82F6" />
            </Pressable>
          </View>
          {experience?.length ? (
            experience.map((exp, idx) => (
              <View key={idx} style={styles.expBox}>
                <Text style={styles.expTitle}>{exp?.job_title || '—'}</Text>
                <Text>{exp?.company_name || '—'}</Text>
                <Text>
                  {(exp?.joining_date || '—') +
                    ' → ' +
                    (exp?.end_date || 'Present')}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.valueText}>No experience details</Text>
          )}
        </View>

        {/* Skills */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Pressable onPress={goEditSkills} hitSlop={8}>
              <MaterialIcons name="edit" size={20} color="#3B82F6" />
            </Pressable>
          </View>
          <View style={styles.skillContainer}>
            {skills?.length ? (
              skills.map((skill, idx) => (
                <View key={idx} style={styles.skillBadge}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.valueText}>No skills listed</Text>
            )}
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialIcons name="logout" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: wp(4), paddingBottom: hp(10) },
  card: {
    borderRadius: 12,
    padding: wp(4),
    marginBottom: hp(2),
    backgroundColor: '#fff',
    elevation: 3,
  },
  headerCard: { alignItems: 'center' },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: wp(22),
    height: wp(22),
    borderRadius: wp(11),
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  avatarText: { fontSize: wp(8), color: '#fff', fontWeight: 'bold' },
  name: { fontSize: wp(6), fontWeight: 'bold' },
  email: { fontSize: wp(4), marginTop: 4 },
  sectionTitle: {
    fontSize: wp(5),
    fontWeight: '600',
    marginBottom: 12,
    lineHeight: wp(6.5),
    color: '#333',
  },
  valueText: { fontSize: wp(4), color: '#374151' },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  fieldLabel: { fontWeight: '600', fontSize: wp(4), marginHorizontal: 6 },
  fieldValue: { flex: 1, fontSize: wp(4) },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    alignItems: 'center',
  },
  expBox: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    marginBottom: 6,
  },
  expTitle: { fontWeight: '600', fontSize: wp(4.2), marginBottom: 4 },
  skillContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  skillBadge: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 6,
    marginBottom: 6,
  },
  skillText: { color: '#0369A1', fontWeight: '500' },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: wp(4),
    marginLeft: 6,
  },
});

export default ProfileView;
