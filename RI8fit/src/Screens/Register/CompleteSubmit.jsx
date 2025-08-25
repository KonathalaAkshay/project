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

const CompleteSubmit = ({ navigation = { navigate: () => {} } }) => {
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

export default CompleteSubmit;
