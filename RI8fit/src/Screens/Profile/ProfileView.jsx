import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Modal,
  TextInput,
  TouchableOpacity,
  Pressable,
  useColorScheme,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const wp = percentage => (width * percentage) / 100;
const hp = percentage => (height * percentage) / 100;

const ProfileView = ({ route, navigation }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  // make route.params safe
  const { candidateData = {} } = route?.params ?? {};

  // States
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

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [editValues, setEditValues] = useState({});

  useEffect(() => {
    const user = candidateData || {};
    const resume = user.resume_data || {};

    const resumeSkills =
      resume?.technical_skills && resume?.technical_skills !== 'Not Specified'
        ? Array.isArray(resume.technical_skills)
          ? resume.technical_skills.map(s => String(s).trim())
          : String(resume.technical_skills)
              .split(',')
              .map(s => s.trim())
        : [];

    const employmentSkills =
      Array.isArray(user.employment) && user.employment.length > 0
        ? user.employment.flatMap(emp => {
            if (!emp?.skills_used) return [];
            if (Array.isArray(emp.skills_used))
              return emp.skills_used.map(s => String(s).trim());
            if (typeof emp.skills_used === 'string')
              return emp.skills_used.split(',').map(s => s.trim());
            return [];
          })
        : [];

    setName(`${user.full_name || ''} ${user.last_name || ''}`.trim());
    setEmail(user.email || '');
    setPhone(user.phone_no || '');
    setResumeUrl(user.resume_url || '');
    setSummary(resume?.professional_summary || '');
    setEducation(Array.isArray(user.education) ? user.education : []);
    setExperience(Array.isArray(user.employment) ? user.employment : []);
    setAvailability(resume?.availability || 'Not specified');
    setTotalExp(user.total_exp_years || '');
    setSkills([...new Set([...resumeSkills, ...employmentSkills])]);
  }, [candidateData]);

  const handleChange = (field, value) => {
    setEditValues(prev => ({ ...prev, [field]: value }));
  };

  const openModal = type => {
    setModalType(type);
    if (type === 'basic') {
      setEditValues({ email, phone, availability, totalExp });
    } else if (type === 'skills') {
      setEditValues({ skills: skills.join(', ') });
    } else if (type === 'education') {
      setEditValues({ education: [...education] });
    } else if (type === 'experience') {
      setEditValues({ experience: [...experience] });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (modalType === 'basic') {
      setEmail(editValues.email || '');
      setPhone(editValues.phone || '');
      setAvailability(editValues.availability || '');
      setTotalExp(editValues.totalExp || '');
    } else if (modalType === 'skills') {
      setSkills(
        editValues.skills
          ? editValues.skills
              .split(',')
              .map(s => s.trim())
              .filter(Boolean)
          : [],
      );
    } else if (modalType === 'education') {
      setEducation(Array.isArray(editValues.education) ? editValues.education : []);
    } else if (modalType === 'experience') {
      setExperience(Array.isArray(editValues.experience) ? editValues.experience : []);
    }
    setShowModal(false);
  };

  const handleLogout = () => {
    navigation?.navigate?.('Login');
  };

  const renderField = (label, value) => (
    <View style={styles.fieldRow}>
      <Text style={[styles.fieldLabel, { color: isDarkMode ? '#E5E7EB' : '#111827' }]}>
        {label}:
      </Text>
      <Text style={[styles.fieldValue, { color: isDarkMode ? '#D1D5DB' : '#374151' }]}>
        {value || 'Not provided'}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#111827' : '#F9FAFB' }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={[styles.card, { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' }]}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{name ? name[0] : 'U'}</Text>
          </View>
          <Text style={[styles.name, { color: isDarkMode ? '#F3F4F6' : '#111827' }]}>
            {name || 'No Name'}
          </Text>
          <Text style={[styles.email, { color: isDarkMode ? '#D1D5DB' : '#6B7280' }]}>
            {email}
          </Text>
        </View>

        {/* Resume */}
        <View style={[styles.card, { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' }]}>
          <Text style={styles.cardTitle}>Resume</Text>
          <Text>{resumeUrl || 'No resume uploaded'}</Text>
        </View>

        {/* Summary */}
        <View style={[styles.card, { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' }]}>
          <Text style={styles.cardTitle}>Profile Summary</Text>
          <Text>{summary || 'No summary provided'}</Text>
        </View>

        {/* Basic Details */}
        <View style={[styles.card, { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' }]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Basic Details</Text>
            <Pressable onPress={() => openModal('basic')}>
              <Text style={styles.editLink}>Edit</Text>
            </Pressable>
          </View>
          {renderField('Email', email)}
          {renderField('Phone', phone)}
          {renderField('Availability', availability)}
          {renderField('Total Exp', totalExp)}
        </View>

        {/* Education */}
        <View style={[styles.card, { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' }]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Education</Text>
            <Pressable onPress={() => openModal('education')}>
              <Text style={styles.editLink}>Edit</Text>
            </Pressable>
          </View>
          {education?.length > 0 ? (
            education.map((edu, idx) => (
              <Text key={idx} style={styles.rowText}>
                {edu?.course || '—'} · {edu?.university || '—'} ({edu?.end_year || '—'})
              </Text>
            ))
          ) : (
            <Text>No education details</Text>
          )}
        </View>

        {/* Experience */}
        <View style={[styles.card, { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' }]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Professional Experience</Text>
            <Pressable onPress={() => openModal('experience')}>
              <Text style={styles.editLink}>Edit</Text>
            </Pressable>
          </View>
          {experience?.length > 0 ? (
            experience.map((exp, idx) => (
              <View key={idx} style={styles.expBox}>
                <Text style={{ fontWeight: 'bold' }}>{exp?.job_title || '—'}</Text>
                <Text>{exp?.company_name || '—'}</Text>
                <Text>
                  {exp?.joining_date || '—'} → {exp?.end_date || 'Present'}
                </Text>
                <Text>{exp?.duration || ''}</Text>
              </View>
            ))
          ) : (
            <Text>No experience details</Text>
          )}
        </View>

        {/* Skills */}
        <View style={[styles.card, { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' }]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Skills</Text>
            <Pressable onPress={() => openModal('skills')}>
              <Text style={styles.editLink}>Edit</Text>
            </Pressable>
          </View>
          <View style={styles.skillContainer}>
            {skills?.length > 0 ? (
              skills.map((skill, idx) => (
                <View key={idx} style={styles.skillBadge}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))
            ) : (
              <Text>No skills listed</Text>
            )}
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Edit Modal */}
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' },
            ]}
          >
            <Text style={styles.modalTitle}>Edit {modalType?.toUpperCase()}</Text>

            {modalType === 'basic' && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={editValues.email}
                  onChangeText={val => handleChange('email', val)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Phone"
                  value={editValues.phone}
                  onChangeText={val => handleChange('phone', val)}
                  keyboardType="phone-pad"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Availability"
                  value={editValues.availability}
                  onChangeText={val => handleChange('availability', val)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Total Experience"
                  value={editValues.totalExp}
                  onChangeText={val => handleChange('totalExp', val)}
                />
              </>
            )}

            {modalType === 'skills' && (
              <TextInput
                style={styles.input}
                placeholder="Enter skills (comma separated)"
                value={editValues.skills}
                onChangeText={val => handleChange('skills', val)}
                autoCapitalize="none"
              />
            )}

            {modalType === 'education' && (
              <>
                {editValues.education?.map((edu, idx) => (
                  <View key={idx} style={styles.editBox}>
                    <TextInput
                      style={styles.input}
                      placeholder="Course"
                      value={edu.course}
                      onChangeText={val => {
                        const updated = [...editValues.education];
                        updated[idx] = { ...updated[idx], course: val };
                        handleChange('education', updated);
                      }}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="University"
                      value={edu.university}
                      onChangeText={val => {
                        const updated = [...editValues.education];
                        updated[idx] = { ...updated[idx], university: val };
                        handleChange('education', updated);
                      }}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="End Year"
                      value={edu.end_year}
                      onChangeText={val => {
                        const updated = [...editValues.education];
                        updated[idx] = { ...updated[idx], end_year: val };
                        handleChange('education', updated);
                      }}
                      keyboardType="numeric"
                    />
                    <Pressable
                      onPress={() => {
                        const updated = editValues.education.filter((_, i) => i !== idx);
                        handleChange('education', updated);
                      }}
                    >
                      <Text style={styles.deleteText}>Delete</Text>
                    </Pressable>
                  </View>
                ))}
                <Pressable
                  onPress={() =>
                    handleChange('education', [
                      ...(editValues.education || []),
                      { course: '', university: '', end_year: '' },
                    ])
                  }
                >
                  <Text style={styles.addText}>+ Add Education</Text>
                </Pressable>
              </>
            )}

            {modalType === 'experience' && (
              <>
                {editValues.experience?.map((exp, idx) => (
                  <View key={idx} style={styles.editBox}>
                    <TextInput
                      style={styles.input}
                      placeholder="Job Title"
                      value={exp.job_title}
                      onChangeText={val => {
                        const updated = [...editValues.experience];
                        updated[idx] = { ...updated[idx], job_title: val };
                        handleChange('experience', updated);
                      }}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Company"
                      value={exp.company_name}
                      onChangeText={val => {
                        const updated = [...editValues.experience];
                        updated[idx] = { ...updated[idx], company_name: val };
                        handleChange('experience', updated);
                      }}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Joining Date"
                      value={exp.joining_date}
                      onChangeText={val => {
                        const updated = [...editValues.experience];
                        updated[idx] = { ...updated[idx], joining_date: val };
                        handleChange('experience', updated);
                      }}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="End Date"
                      value={exp.end_date}
                      onChangeText={val => {
                        const updated = [...editValues.experience];
                        updated[idx] = { ...updated[idx], end_date: val };
                        handleChange('experience', updated);
                      }}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Duration"
                      value={exp.duration}
                      onChangeText={val => {
                        const updated = [...editValues.experience];
                        updated[idx] = { ...updated[idx], duration: val };
                        handleChange('experience', updated);
                      }}
                    />
                    <Pressable
                      onPress={() => {
                        const updated = editValues.experience.filter((_, i) => i !== idx);
                        handleChange('experience', updated);
                      }}
                    >
                      <Text style={styles.deleteText}>Delete</Text>
                    </Pressable>
                  </View>
                ))}
                <Pressable
                  onPress={() =>
                    handleChange('experience', [
                      ...(editValues.experience || []),
                      {
                        job_title: '',
                        company_name: '',
                        joining_date: '',
                        end_date: '',
                        duration: '',
                      },
                    ])
                  }
                >
                  <Text style={styles.addText}>+ Add Experience</Text>
                </Pressable>
              </>
            )}

            <View style={styles.modalActions}>
              <Pressable onPress={() => setShowModal(false)} style={styles.cancelBtn}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
              <Pressable onPress={handleSave} style={styles.saveBtn}>
                <Text style={styles.saveText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    elevation: 3, // Android shadow
  },

  avatar: {
    width: wp(24),
    height: wp(24),
    borderRadius: wp(12),
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(1.5),
    alignSelf: 'center',
  },
  avatarText: { fontSize: wp(8), color: '#FFFFFF', fontWeight: 'bold' },
  name: { fontSize: wp(6), fontWeight: 'bold', textAlign: 'center' },
  email: { fontSize: wp(4), textAlign: 'center' },

  cardTitle: { fontSize: wp(4.5), fontWeight: 'bold', marginBottom: 6 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  editLink: { color: '#3B82F6', fontWeight: '600' },

  fieldRow: { flexDirection: 'row', marginBottom: 6 },
  fieldLabel: { fontWeight: 'bold', fontSize: wp(4), marginRight: 6 },
  fieldValue: { flex: 1, fontSize: wp(4) },
  rowText: { marginBottom: 6 },

  expBox: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
    marginBottom: 6,
  },

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
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  logoutText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: wp(4.2) },

  // Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
  },
  modalContent: { borderRadius: 12, padding: 20 },
  modalTitle: { fontSize: wp(5), fontWeight: 'bold', marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
  },
  editBox: {
    marginBottom: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
  },
  deleteText: { color: '#EF4444', fontWeight: '600', marginTop: 4 },
  addText: { color: '#3B82F6', fontWeight: '600', marginTop: 8 },

  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 },
  cancelBtn: { padding: 10, marginRight: 10 },
  cancelText: { color: '#6B7280' },
  saveBtn: {
    backgroundColor: '#3B82F6',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  saveText: { color: '#FFFFFF', fontWeight: '600' },
});

export default ProfileView;
