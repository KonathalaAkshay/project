/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  Box,
  HStack,
  VStack,
  Avatar,
  ScrollView,
  Badge,
  Divider,
  Text,
} from 'native-base';
import { StyleSheet, Dimensions, useColorScheme } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import BottomNavBar from '../../Components/BottomNav';

const { width, height } = Dimensions.get('window');

const wp = percentage => (width * percentage) / 100;
const hp = percentage => (height * percentage) / 100;

const ProfileView = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profile, setProfile] = useState('');
  const [report, setReport] = useState('');
  const [summary, setSummary] = useState('');
  const [additional, setAdditional] = useState('');
  const [entries, setEntries] = useState([]);
  const [professionalDetails, setProfessionalDetails] = useState({
    industry: 'IT Services & Consulting',
    department: 'IT & Information Security',
    roleCategory: 'IT Support',
    jobRole: 'IT Support - Other',
  });
  const [careerPreferences, setCareerPreferences] = useState({
    preferredLocation: 'Hyderabad',
    preferredRole: 'Software Engineer',
    preferredSalary: '3–5 LPA',
    preferredShift: 'Day',
    jobType: 'Full Time',
    employmentType: 'Hybrid',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // API base URL for Random User API
  const API_BASE_URL = 'https://randomuser.me/api';

  // Fetch profile data on component mount
  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_BASE_URL);
      const user = response.data.results[0];
      setName(`${user.name.first} ${user.name.last}`);
      setDob(
        new Date(user.dob.date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
      );
      setProfile(`${user.picture.medium}`);
      setEmail(user.email);
      setPhone(user.phone);
      setEducation('B.Tech in ECE');
      setExperience(`${user.registered.age}`);
      setReport('10 days');
      setSummary('');
      setAdditional('');
      setEntries(['python']);
      setProfessionalDetails({
        industry: 'IT Services & Consulting',
        department: 'IT & Information Security',
        roleCategory: 'IT Support',
        jobRole: 'IT Support - Other',
      });
      setCareerPreferences({
        preferredLocation: user.location.city || 'Hyderabad',
        preferredRole: 'Software Engineer',
        preferredSalary: '3–5 LPA',
        preferredShift: 'Day',
        jobType: 'Full Time',
        employmentType: 'Hybrid',
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      setErrors({ fetch: 'Failed to load profile data' });
    } finally {
      setLoading(false);
    }
  };

  const toTitleCase = str =>
    str
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, s => s.toUpperCase())
      .trim();

  const renderField = (label, value, icon) => (
    <HStack alignItems="center" space={3} mb={hp(2)}>
      <Text
        bold
        width="30%"
        fontSize={wp(4)}
        color={isDarkMode ? '#E5E7EB' : '#1F2937'}
      >
        {icon} {label}
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
    <Box style={[styles.container, { backgroundColor: isDarkMode ? '#1F2937' : '#F3F4F6' }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {loading && (
          <Text
            fontSize={wp(4)}
            color={isDarkMode ? '#E5E7EB' : '#1F2937'}
            textAlign="center"
            mt={hp(2)}
          >
            Loading...
          </Text>
        )}
        {Object.values(errors).map((error, index) => (
          <Text
            key={index}
            fontSize={wp(3.5)}
            color="red.500"
            textAlign="center"
            mt={hp(1)}
          >
            {error}
          </Text>
        ))}
        {/* Profile Header */}
        <Box
          bg={isDarkMode ? '#374151' : '#FFFFFF'}
          borderRadius="2xl"
          p={wp(4)}
          mb={hp(2)}
          shadow={4}
          width="100%"
          alignItems="center"
          mt={4}
        >
          <Avatar
            size={wp(24)}
            source={{ uri: profile }}
            mb={hp(2)}
            bg={isDarkMode ? '#4B5563' : '#BFDBFE'}
            borderWidth={2}
            borderColor="#3B82F6"
          >
            <Text color={isDarkMode ? '#E5E7EB' : '#1F2937'}>
              {name ? name[0] : ''}
            </Text>
          </Avatar>
          <Text
            fontSize={wp(6)}
            fontWeight="bold"
            color={isDarkMode ? '#E5E7EB' : '#1F2937'}
          >
            {name}
          </Text>
          <Text
            fontSize={wp(4)}
            mt={hp(1)}
            color={isDarkMode ? '#D1D5DB' : '#4B5563'}
            style={{ textAlign: 'center' }}
          >
            {email}
          </Text>
        </Box>

        {/* Video & Resume Profile Section */}
        <Box
          bg={isDarkMode ? '#374151' : '#FFFFFF'}
          borderRadius="2xl"
          p={6}
          mb={6}
          shadow={4}
        >
          <Text
            fontSize="lg"
            fontWeight="bold"
            mb={4}
            color={isDarkMode ? '#E5E7EB' : '#1F2937'}
          >
            Video Profile
          </Text>
          <Box
            bg={isDarkMode ? '#4B5563' : '#E5E7EB'}
            p={8}
            borderRadius="lg"
            alignItems="center"
          >
            <Icon
              as={MaterialIcons}
              name="video-call"
              size="lg"
              color={isDarkMode ? '#D1D5DB' : '#4B5563'}
            />
            <Text
              fontSize="md"
              mt={2}
              color={isDarkMode ? '#D1D5DB' : '#4B5563'}
            >
              No video available
            </Text>
          </Box>
          <Divider my={6} bg={isDarkMode ? '#6B7280' : '#D1D5DB'} />
          <Text
            fontSize="lg"
            fontWeight="bold"
            mb={4}
            color={isDarkMode ? '#E5E7EB' : '#1F2937'}
          >
            Resume
          </Text>
          <Box
            bg={isDarkMode ? '#4B5563' : '#E5E7EB'}
            p={8}
            borderRadius="lg"
            alignItems="center"
          >
            <Icon
              as={MaterialIcons}
              name="description"
              size="lg"
              color={isDarkMode ? '#D1D5DB' : '#4B5563'}
            />
            <Text
              fontSize="md"
              mt={2}
              color={isDarkMode ? '#D1D5DB' : '#4B5563'}
            >
              No resume available
            </Text>
          </Box>
        </Box>

        {/* Profile Summary */}
        <Box
          bg={isDarkMode ? '#374151' : '#FFFFFF'}
          borderRadius="2xl"
          p={6}
          mb={6}
          shadow={4}
        >
          <Text
            fontSize="lg"
            fontWeight="bold"
            mb={4}
            color={isDarkMode ? '#E5E7EB' : '#1F2937'}
          >
            Profile Summary
          </Text>
          <Text
            fontSize={wp(4)}
            color={isDarkMode ? '#E5E7EB' : '#1F2937'}
          >
            {summary || 'No summary provided'}
          </Text>
        </Box>

        {/* Basic Details */}
        <Box
          bg={isDarkMode ? '#374151' : '#FFFFFF'}
          borderRadius="2xl"
          p={wp(4)}
          mb={hp(2)}
          shadow={4}
          width="100%"
        >
          <Text
            fontSize={wp(4.5)}
            fontWeight="bold"
            mb={hp(2)}
            color={isDarkMode ? '#E5E7EB' : '#1F2937'}
          >
            Basic Details
          </Text>
          {renderField('', dob, '📅')}
          {renderField('', `${experience} years`, '💼')}
          {renderField('', education, '📖')}
          {renderField('', email, '✉️')}
          {renderField('', phone, '📱')}
          {renderField('', `Available in ${report}`, '📆')}
        </Box>

        {/* Skills Section */}
        <Box
          bg={isDarkMode ? '#374151' : '#FFFFFF'}
          borderRadius="2xl"
          p={wp(4)}
          mb={hp(2)}
          shadow={4}
          width="100%"
        >
          <Text
            fontSize={wp(4.5)}
            fontWeight="bold"
            mb={hp(2)}
            color={isDarkMode ? '#E5E7EB' : '#1F2937'}
          >
            Skills
          </Text>
          <HStack space={2} flexWrap="wrap">
            {entries.length > 0 ? (
              entries.map((item, index) => (
                <Badge
                  key={index}
                  bg={isDarkMode ? '#4B5563' : '#BFDBFE'}
                  borderRadius="full"
                  px={wp(3)}
                  py={hp(1)}
                  _text={{
                    color: isDarkMode ? '#BFDBFE' : '#2563EB',
                    fontSize: wp(4),
                  }}
                >
                  {item}
                </Badge>
              ))
            ) : (
              <Text
                fontSize={wp(4)}
                color={isDarkMode ? '#E5E7EB' : '#1F2937'}
              >
                No skills listed
              </Text>
            )}
          </HStack>
        </Box>

        {/* Professional Details */}
        <Box
          bg={isDarkMode ? '#374151' : '#FFFFFF'}
          borderRadius="2xl"
          p={wp(4)}
          mb={hp(2)}
          shadow={4}
          width="100%"
        >
          <Text
            fontSize={wp(4.5)}
            fontWeight="bold"
            mb={hp(2)}
            color={isDarkMode ? '#E5E7EB' : '#1F2937'}
          >
            Professional Details
          </Text>
          <VStack space={hp(2)}>
            {Object.keys(professionalDetails).map(key => (
              <HStack key={key} alignItems="center" space={3}>
                <Text
                  bold
                  width="30%"
                  fontSize={wp(4)}
                  color={isDarkMode ? '#E5E7EB' : '#1F2937'}
                >
                  {toTitleCase(key)}
                </Text>
                <Text
                  flex={1}
                  fontSize={wp(4)}
                  color={isDarkMode ? '#E5E7EB' : '#1F2937'}
                >
                  {professionalDetails[key] || 'Not provided'}
                </Text>
              </HStack>
            ))}
          </VStack>
        </Box>

        {/* Career Preferences */}
        <Box
          bg={isDarkMode ? '#374151' : '#FFFFFF'}
          borderRadius="2xl"
          p={wp(4)}
          mb={hp(2)}
          shadow={4}
          width="100%"
        >
          <Text
            fontSize={wp(4.5)}
            fontWeight="bold"
            mb={hp(2)}
            color={isDarkMode ? '#E5E7EB' : '#1F2937'}
          >
            Career Preferences
          </Text>
          <VStack space={hp(2)}>
            {Object.keys(careerPreferences).map(key => (
              <HStack key={key} alignItems="center" space={3}>
                <Text
                  bold
                  width="30%"
                  fontSize={wp(4)}
                  color={isDarkMode ? '#E5E7EB' : '#1F2937'}
                >
                  {toTitleCase(key)}
                </Text>
                <Text
                  flex={1}
                  fontSize={wp(4)}
                  color={isDarkMode ? '#E5E7EB' : '#1F2937'}
                >
                  {careerPreferences[key] || 'Not provided'}
                </Text>
              </HStack>
            ))}
          </VStack>
        </Box>

        {/* Additional Details */}
        <Box
          bg={isDarkMode ? '#374151' : '#FFFFFF'}
          borderRadius="2xl"
          p={wp(4)}
          mb={hp(2)}
          shadow={4}
          width="100%"
        >
          <Text
            fontSize={wp(4.5)}
            fontWeight="bold"
            mb={hp(2)}
            color={isDarkMode ? '#E5E7EB' : '#1F2937'}
          >
            Additional Details
          </Text>
          <Text
            fontSize={wp(4)}
            color={isDarkMode ? '#E5E7EB' : '#1F2937'}
          >
            {additional || 'No additional details provided'}
          </Text>
        </Box>
      </ScrollView>
      <BottomNavBar />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(10),
  },
});

export default ProfileView;