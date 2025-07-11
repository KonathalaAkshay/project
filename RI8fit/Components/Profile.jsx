/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Input,
  HStack,
  VStack,
  Avatar,
  Link,
  IconButton,
  Icon,
  ScrollView,
  Pressable,
  Badge,
  Divider,
} from 'native-base';
import { TextInput, Menu, Button, Provider, Text } from 'react-native-paper';
import {
  RefreshControl,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  useColorScheme,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import BottomNavBar from './BottomNav';

const { width, height } = Dimensions.get('window');

const wp = percentage => (width * percentage) / 100;
const hp = percentage => (height * percentage) / 100;

const Profile = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [refreshing, setRefreshing] = useState(false);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profile,setProfile] = useState('');
  const [report, setReport] = useState('');
  const [inputText, setInputText] = useState('');
  const [entries, setEntries] = useState([]);
  const [summary, setSummary] = useState('');
  const [additional, setAdditional] = useState('');

  const [editField, setEditField] = useState({
    name: false,
    dob: false,
    education: false,
    experience: false,
    email: false,
    phone: false,
    report: false,
  });

  const toTitleCase = str =>
    str
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, s => s.toUpperCase())
      .trim();

  const professionalOptions = {
    industry: [
      'IT Services & Consulting',
      'Software Development',
      'Telecommunications',
    ],
    department: ['IT & Information Security', 'Development', 'Operations'],
    roleCategory: ['IT Support', 'Development', 'Management'],
    jobRole: ['IT Support - Other', 'Network Admin', 'Help Desk'],
  };

  const [professionalDetails, setProfessionalDetails] = useState({
    industry: 'IT Services & Consulting',
    department: 'IT & Information Security',
    roleCategory: 'IT Support',
    jobRole: 'IT Support - Other',
  });

  const careerPreferenceOptions = {
    preferredLocation: ['Bangalore', 'Hyderabad', 'Mumbai', 'Remote'],
    preferredRole: [
      'Software Engineer',
      'Backend Developer',
      'Frontend Developer',
      'Full Stack Developer',
    ],
    preferredSalary: ['3–5 LPA', '5–8 LPA', '8–12 LPA', '12+ LPA'],
    preferredShift: ['Day', 'Night', 'Flexible'],
    jobType: ['Full Time', 'Part Time', 'Internship', 'Contract'],
    employmentType: ['On-site', 'Remote', 'Hybrid'],
  };

  const [careerPreferences, setCareerPreferences] = useState({
    preferredLocation: 'Hyderabad',
    preferredRole: 'Software Engineer',
    preferredSalary: '3–5 LPA',
    preferredShift: 'Day',
    jobType: 'Full Time',
    employmentType: 'Hybrid',
  });

  const [menuVisibility, setMenuVisibility] = useState(
    Object.keys(professionalOptions)
      .concat(Object.keys(careerPreferenceOptions))
      .reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {}),
  );

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
      setDob(new Date(user.dob.date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }));
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

  const toggleDropdownMenu = key => {
    setMenuVisibility(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDropdownSelect = (fieldKey, value, type) => {
    if (type === 'professional') {
      setProfessionalDetails(prev => ({ ...prev, [fieldKey]: value }));
    } else if (type === 'career') {
      setCareerPreferences(prev => ({ ...prev, [fieldKey]: value }));
      setErrors(prev => ({ ...prev, [fieldKey]: '' }));
    }
    toggleDropdownMenu(fieldKey);
  };

  const validatePreferences = prefs => {
    const newErrors = {};
    Object.keys(prefs).forEach(key => {
      if (!prefs[key]) {
        newErrors[key] = `${toTitleCase(key)} is required.`;
      }
    });
    return newErrors;
  };

  const handleSavePreferences = async () => {
    const validationErrors = validatePreferences(careerPreferences);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      // Random User API doesn't support updates, so log to console
      console.log('Would save preferences to API:', careerPreferences);
    } catch (error) {
      console.error('Error saving preferences:', error);
      setErrors({ save: 'Failed to save preferences' });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSummary = async () => {
    setLoading(true);
    try {
      // Random User API doesn't support updates, so log to console
      console.log('Would save summary to API:', summary);
    } catch (error) {
      console.error('Error saving summary:', error);
      setErrors({ summary: 'Failed to save summary' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSkill = async indexToDelete => {
    const updatedSkills = entries.filter((_, index) => index !== indexToDelete);
    setLoading(true);
    try {
      // Random User API doesn't support updates, so update local state
      setEntries(updatedSkills);
      console.log('Would save updated skills to API:', updatedSkills);
    } catch (error) {
      console.error('Error deleting skill:', error);
      setErrors({ skills: 'Failed to delete skill' });
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProfileData().then(() => setRefreshing(false));
  }, []);

  const handleAddSkill = async () => {
    if (inputText.trim() === '') return;
    const updatedSkills = [...entries, inputText];
    setLoading(true);
    try {
      // Random User API doesn't support updates, so update local state
      setEntries(updatedSkills);
      setInputText('');
      console.log('Would save new skill to API:', updatedSkills);
    } catch (error) {
      console.error('Error adding skill:', error);
      setErrors({ skills: 'Failed to add skill' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitProfile = async () => {
    const profileData = {
      name,
      dob,
      education,
      experience,
      email,
      phone,
      report,
      summary,
      professionalDetails,
      careerPreferences,
      additional,
      skills: entries,
    };
    setLoading(true);
    try {
      // Random User API doesn't support updates, so log to console
      console.log('Would save profile to API:', profileData);
      setEditField({
        name: false,
        dob: false,
        education: false,
        experience: false,
        email: false,
        phone: false,
        report: false,
      });
      await handleSavePreferences();
    } catch (error) {
      console.error('Error saving profile:', error);
      setErrors({ submit: 'Failed to save profile' });
    } finally {
      setLoading(false);
    }
  };

  const renderEditableField = (label, value, setValue, fieldKey, icon) => (
    <HStack alignItems="center" space={3} mb={hp(2)}>
      <Text
        bold
        width="30%"
        fontSize={wp(4)}
        color={isDarkMode ? '#E5E7EB' : '#1F2937'}
      >
        {icon} {label}
      </Text>
      {editField[fieldKey] ? (
        <HStack flex={1} alignItems="center" space={2}>
          <Input
            value={value}
            onChangeText={setValue}
            placeholder={`Enter ${label.toLowerCase()}`}
            flex={1}
            borderRadius="lg"
            py={hp(1)}
            fontSize={wp(4)}
            bg={isDarkMode ? '#374151' : '#FFFFFF'}
            color={isDarkMode ? '#E5E7EB' : '#1F2937'}
            borderColor={isDarkMode ? '#4B5563' : '#D1D5DB'}
            _focus={{
              borderColor: '#3B82F6',
              backgroundColor: isDarkMode ? '#4B5563' : '#F3F4F6',
            }}
          />
          <IconButton
            icon={
              <Icon
                as={MaterialIcons}
                name="check"
                size={wp(5)}
                color="#22C55E"
              />
            }
            onPress={() => setEditField({ ...editField, [fieldKey]: false })}
            borderRadius="full"
          />
        </HStack>
      ) : (
        <HStack flex={1} alignItems="center" space={2}>
          <Text
            flex={1}
            fontSize={wp(4)}
            color={isDarkMode ? '#E5E7EB' : '#1F2937'}
          >
            {value}
          </Text>
          <IconButton
            icon={
              <Icon
                as={MaterialIcons}
                name="edit"
                size={wp(5)}
                color="#3B82F6"
              />
            }
            onPress={() => setEditField({ ...editField, [fieldKey]: true })}
            borderRadius="full"
          />
        </HStack>
      )}
    </HStack>
  );

  return (
    <Provider>
      <KeyboardAvoidingView
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? '#1F2937' : '#F3F4F6' },
        ]}
        keyboardVerticalOffset={hp(10)}
      >
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={isDarkMode ? '#E5E7EB' : '#1F2937'}
            />
          }
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
            alignItems={'center'}
            mt={4}
          >
            <Avatar
              size={wp(24)}
              source={{
                uri: profile, 
              }}
              mb={hp(2)}
              bg={isDarkMode ? '#4B5563' : '#BFDBFE'}
              borderWidth={2}
              borderColor="#3B82F6"
            >
              <Text color={isDarkMode ? '#E5E7EB' : '#1F2937'}>
                {name ? name[0] : ''}
              </Text>
            </Avatar>
            {editField.name ? (
              <HStack space={3} alignItems="center" w="full">
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter name"
                  style={[
                    styles.textInput,
                    {
                      fontSize: wp(6),
                      backgroundColor: isDarkMode ? '#4B5563' : '#FFFFFF',
                      color: isDarkMode ? '#E5E7EB' : '#1F2937',
                    },
                  ]}
                />
                <IconButton
                  icon={
                    <Icon
                      as={MaterialIcons}
                      name="check"
                      size={wp(6)}
                      color="#22C55E"
                    />
                  }
                  onPress={() => setEditField({ ...editField, name: false })}
                  borderRadius="full"
                />
              </HStack>
            ) : (
              <HStack space={3} alignItems="center">
                <Text
                  fontSize={wp(6)}
                  fontWeight="bold"
                  style={{ fontWeight: 'bold', fontSize: 18 }}
                  color={isDarkMode ? '#E5E7EB' : '#1F2937'}
                >
                  {name}
                </Text>
                <IconButton
                  icon={
                    <Icon
                      as={MaterialIcons}
                      name="edit"
                      size={wp(6)}
                      color="#3B82F6"
                    />
                  }
                  onPress={() => setEditField({ ...editField, name: true })}
                  borderRadius="full"
                />
              </HStack>
            )}
            <Text
              fontSize={wp(4)}
              mt={hp(1)}
              color={isDarkMode ? '#D1D5DB' : '#4B5563'}
              style={{ textAlign: 'center', marginRight: 15 }}
            >
              {email}
            </Text>
          </Box>

          {/* Video & resume Profile Section */}
          <Box
            bg={isDarkMode ? '#374151' : '#FFFFFF'}
            borderRadius="2xl"
            p={6}
            mb={6}
            shadow={4}
          >
            <HStack justifyContent="space-between" alignItems="center" mb={4}>
              <Text
                fontSize="lg"
                fontWeight="bold"
                style={{ fontWeight: 'bold', fontSize: 18 }}
                color={isDarkMode ? '#E5E7EB' : '#1F2937'}
              >
                Video Profile
              </Text>
              <Link
                _text={{ color: '#3B82F6', fontWeight: 'semibold' }}
                isUnderlined={false}
              >
                Add now
              </Link>
            </HStack>

            <Pressable
              bg={isDarkMode ? '#4B5563' : '#E5E7EB'}
              p={8}
              borderRadius="lg"
              alignItems="center"
              _pressed={{ bg: isDarkMode ? '#6B7280' : '#D1D5DB' }}
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
                Add video
              </Text>
            </Pressable>

            <HStack justifyContent="space-between" alignItems="center" mb={4}>
              <Text
                mt={4}
                fontWeight="medium"
                fontSize="sm"
                color={isDarkMode ? '#D1D5DB' : '#4B5563'}
              >
                Improve your hiring chances by 30% with a video profile
              </Text>
            </HStack>
            <Text
              mt={1}
              fontSize="sm"
              color={isDarkMode ? '#D1D5DB' : '#4B5563'}
            >
              Recruiters prefer candidates who showcase their personality
            </Text>
            <Link
              mt={2}
              _text={{ color: '#3B82F6', fontSize: 'sm' }}
              isUnderlined={false}
            >
              Learn how it helps
            </Link>

            <Divider my={6} bg={isDarkMode ? ' #6B7280' : ' #D1D5DB'} />

            <HStack justifyContent="space-between" alignItems="center" mb={4}>
              <Text
                fontSize="lg"
                fontWeight="bold"
                style={{ fontWeight: 'bold', fontSize: 18 }}
                color={isDarkMode ? '#E5E7EB' : '#1F2937'}
              >
                Resume
              </Text>
              <Link
                _text={{ color: '#3B82F6', fontWeight: 'semibold' }}
                isUnderlined={false}
              >
                Upload now
              </Link>
            </HStack>

            <Pressable
              bg={isDarkMode ? '#4B5563' : '#E5E7EB'}
              p={8}
              borderRadius="lg"
              alignItems="center"
              _pressed={{ bg: isDarkMode ? '#6B7280' : '#D1D5DB' }}
            >
              <Icon
                as={MaterialIcons}
                name="upload-file"
                size="lg"
                color={isDarkMode ? '#D1D5DB' : '#4B5563'}
              />
              <Text
                fontSize="md"
                mt={2}
                color={isDarkMode ? '#D1D5DB' : '#4B5563'}
              >
                Upload Resume
              </Text>
            </Pressable>

            <Text
              mt={4}
              fontSize="sm"
              color={isDarkMode ? '#D1D5DB' : '#4B5563'}
            >
              Stand out to employers by adding your latest resume
            </Text>
          </Box>

          {/* Profile Summary */}
          <Box
            bg={isDarkMode ? '#374151' : '#FFFFFF'}
            borderRadius="2xl"
            p={6}
            mb={6}
            shadow={4}
          >
            <HStack justifyContent="space-between" alignItems="center" mb={4}>
              <Text
                fontSize="lg"
                fontWeight="bold"
                mb={4}
                style={{ fontWeight: 'bold', fontSize: 18 }}
                color={isDarkMode ? '#E5E7EB' : '#1F2937'}
              >
                Profile Summary
              </Text>
            </HStack>
            <TextInput
              value={summary}
              onChangeText={setSummary}
              placeholder="Write a brief summary about yourself..."
              style={[
                styles.textInput,
                {
                  fontSize: wp(4),
                  backgroundColor: isDarkMode ? '#4B5563' : '#FFFFFF',
                  color: isDarkMode ? '#E5E7EB' : '#1F2937',
                },
              ]}
              placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
            />

            <Button
              mt={4}
              onPress={handleSaveSummary}
              alignSelf="flex-end"
              style={{ backgroundColor: '#3B82F6' }}
              labelStyle={{ color: '#FFFFFF' }}
              disabled={loading}
            >
              Save
            </Button>
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
            <HStack justifyContent="space-between" alignItems="center" mb={4}>
              <Text
                fontSize={wp(4.5)}
                fontWeight="bold"
                mb={hp(2)}
                style={{ fontWeight: 'bold', fontSize: 18 }}
                color={isDarkMode ? '#E5E7EB' : '#1F2937'}
              >
                Basic Details
              </Text>
            </HStack>
            {renderEditableField('', dob, setDob, 'dob', '📅')}
            {renderEditableField(
              '',
              `${experience} years`,
              setExperience,
              'experience',
              '💼',
            )}
            {renderEditableField(
              '',
              education,
              setEducation,
              'education',
              '📖',
            )}
            {renderEditableField('', email, setEmail, 'email', '✉️')}
            {renderEditableField('', phone, setPhone, 'phone', '📱')}
            {renderEditableField(
              '',
              `Available in ${report}`,
              setReport,
              'report',
              '📆',
            )}
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
            <HStack justifyContent="space-between" alignItems="center" mb={4}>
              <Text
                fontWeight="bold"
                mb={hp(2)}
                style={{ fontWeight: 'bold', fontSize: 18 }}
                color={isDarkMode ? '#E5E7EB' : '#1F2937'}
              >
                Skills
              </Text>
            </HStack>
            <HStack space={3} mb={hp(2)}>
              <TextInput
                placeholder="Add a skill (e.g., Python)"
                value={inputText}
                onChangeText={setInputText}
                style={[
                  styles.textInput,
                  {
                    fontSize: wp(4),
                    backgroundColor: isDarkMode ? '#4B5563' : '#FFFFFF',
                    color: isDarkMode ? '#E5E7EB' : '#1F2937',
                  },
                ]}
                placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
              />
              <Button
                onPress={handleAddSkill}
                borderRadius="lg"
                _text={{
                  color: '#FFFFFF',
                  fontSize: wp(2),
                  fontWeight: 'semibold',
                }}
                style={{
                  justifyContent: 'center',
                  backgroundColor: '#3B82F6',
                }}
                labelStyle={{ color: '#FFFFFF', fontSize: wp(4) }}
                disabled={loading}
              >
                Add
              </Button>
            </HStack>
            <VStack space={hp(1)}>
              {entries.map((item, index) => (
                <HStack key={index} space={2} alignItems="center">
                  <Badge
                    bg={isDarkMode ? '#4B5563' : '#BFDBFE'}
                    borderRadius="full"
                    px={wp(3)}
                    py={hp(1)}
                    _text={{
                      color: isDarkMode ? '#BFDBFE' : '#2563EB',
                      fontSize: wp(4),
                    }}
                  >
                    <HStack space={2} alignItems="center">
                      <Text
                        color={isDarkMode ? '#BFDBFE' : '#2563EB'}
                        fontSize={wp(4)}
                      >
                        {item}
                      </Text>
                      <IconButton
                        icon={
                          <MaterialIcons
                            name="delete"
                            size={wp(4)}
                            color="#EF4444"
                          />
                        }
                        onPress={() => handleDeleteSkill(index)}
                        accessibilityLabel={`Delete ${item} skill`}
                        _pressed={{ bg: isDarkMode ? '#7F1D1D' : '#FECACA' }}
                        size="sm"
                      />
                    </HStack>
                  </Badge>
                </HStack>
              ))}
            </VStack>
          </Box>

          {/* Professional Details */}
          <Box
            bg={isDarkMode ? '#374151' : '#FFFFFF'}
            borderRadius="2xl"
            p={wp(4)}
            mb={hp(2)}
            shadow={4}
            width="100%"
            zIndex={10}
          >
            <HStack
              justifyContent="space-between"
              alignItems="center"
              mb={hp(2)}
            >
              <Text
                fontWeight="bold"
                mb={hp(2)}
                style={{ fontWeight: 'bold', fontSize: 18 }}
                color={isDarkMode ? '#E5E7EB' : '#1F2937'}
              >
                Professional Details
              </Text>
            </HStack>
            <VStack space={hp(2)}>
              {Object.keys(professionalOptions).map(key => (
                <Box
                  key={key}
                  zIndex={1000 - Object.keys(professionalOptions).indexOf(key)}
                >
                  <Menu
                    visible={menuVisibility[key]}
                    onDismiss={() => toggleDropdownMenu(key)}
                    anchor={
                      <TextInput
                        label={toTitleCase(key)}
                        value={professionalDetails[key]}
                        editable={false}
                        right={
                          <TextInput.Icon
                            icon={() => (
                              <MaterialIcons
                                name="keyboard-arrow-down"
                                size={wp(6)}
                                color={isDarkMode ? '#E5E7EB' : '#1F2937'}
                              />
                            )}
                            onPress={() => toggleDropdownMenu(key)}
                          />
                        }
                        style={[
                          styles.textInput,
                          {
                            fontSize: wp(4),
                            backgroundColor: isDarkMode ? '#4B5563' : '#FFFFFF',
                            color: isDarkMode ? '#E5E7EB' : '#1F2937',
                          },
                        ]}
                        placeholderTextColor={
                          isDarkMode ? '#9CA3AF' : '#6B7280'
                        }
                        onPressIn={() => toggleDropdownMenu(key)}
                      />
                    }
                    contentStyle={{
                      backgroundColor: isDarkMode ? '#374151' : '#FFFFFF',
                    }}
                  >
                    {professionalOptions[key].map(item => (
                      <Menu.Item
                        key={item}
                        onPress={() =>
                          handleDropdownSelect(key, item, 'professional')
                        }
                        title={item}
                        titleStyle={{
                          fontSize: wp(4),
                          color: isDarkMode ? '#E5E7EB' : '#1F2937',
                        }}
                      />
                    ))}
                  </Menu>
                </Box>
              ))}
            </VStack>
          </Box>

          <Box
            bg={isDarkMode ? '#374151' : '#FFFFFF'}
            borderRadius="2xl"
            p={wp(4)}
            shadow={4}
            width="100%"
            zIndex={9}
          >
            <HStack
              justifyContent="space-between"
              alignItems="center"
              mb={hp(2)}
            >
              <Text
                fontWeight="bold"
                mb={hp(2)}
                style={{ fontWeight: 'bold', fontSize: 18 }}
                color={isDarkMode ? '#E5E7EB' : '#1F2937'}
              >
                Your Career Preferences
              </Text>
            </HStack>

            <VStack space={hp(1)}>
              {Object.keys(careerPreferenceOptions).map(key => (
                <Box
                  key={key}
                  zIndex={
                    1000 - Object.keys(careerPreferenceOptions).indexOf(key)
                  }
                >
                  <Menu
                    visible={menuVisibility[key]}
                    onDismiss={() => toggleDropdownMenu(key)}
                    style={{ display: 'flex' }}
                    anchor={
                      <TextInput
                        label={toTitleCase(key)}
                        value={careerPreferences[key]}
                        editable={false}
                        error={!!errors[key]}
                        right={
                          <TextInput.Icon
                            icon={() => (
                              <MaterialIcons
                                name="keyboard-arrow-down"
                                size={wp(5)}
                                color={isDarkMode ? '#E5E7EB' : '#1F2937'}
                              />
                            )}
                            onPress={() => toggleDropdownMenu(key)}
                          />
                        }
                        style={{
                          fontSize: wp(4),
                          backgroundColor: isDarkMode ? '#4B5563' : '#FFFFFF',
                          color: isDarkMode ? '#E5E7EB' : '#1F2937',
                          borderColor: errors[key] ? 'red' : 'transparent',
                        }}
                        placeholder={`Select ${toTitleCase(key)}`}
                        placeholderTextColor={
                          isDarkMode ? '#9CA3AF' : '#6B7280'
                        }
                        onPressIn={() => toggleDropdownMenu(key)}
                      />
                    }
                    contentStyle={{
                      backgroundColor: isDarkMode ? '#374151' : '#FFFFFF',
                    }}
                  >
                    {careerPreferenceOptions[key].map(item => (
                      <Menu.Item
                        key={item}
                        onPress={() =>
                          handleDropdownSelect(key, item, 'career')
                        }
                        title={item}
                        titleStyle={{
                          fontSize: wp(4),
                          color: isDarkMode ? '#E5E7EB' : '#1F2937',
                        }}
                      />
                    ))}
                  </Menu>
                  {errors[key] && (
                    <Text color="red.500" fontSize={wp(3.5)} mt={1}>
                      {errors[key]}
                    </Text>
                  )}
                </Box>
              ))}
            </VStack>
          </Box>

          <Box
            bg={isDarkMode ? '#374151' : '#FFFFFF'}
            borderRadius="2xl"
            p={wp(4)}
            mt={3}
            mb={hp(2)}
            shadow={4}
            width="100%"
            zIndex={1}
          >
            <HStack justifyContent="space-between" alignItems="center" mb={4}>
              <Text
                mb={hp(2)}
                color={isDarkMode ? '#E5E7EB' : '#1F2937'}
                style={{ fontWeight: 'bold', fontSize: 18 }}
              >
                Additional Details
              </Text>
            </HStack>
            <TextInput
              value={additional}
              onChangeText={setAdditional}
              placeholder="Add any additional information..."
              multiline
              style={[
                styles.textInput,
                {
                  fontSize: wp(4),
                  backgroundColor: isDarkMode ? '#4B5563' : '#FFFFFF',
                  color: isDarkMode ? '#E5E7EB' : '#1F2937',
                },
              ]}
              placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
            />
          </Box>

          <Button
            onPress={handleSubmitProfile}
            mode="contained"
            style={[styles.button]}
            labelStyle={{
              fontSize: wp(4.5),
              fontWeight: 'bold',
              color: '#FFFFFF',
            }}
            disabled={loading}
          >
            Save Profile
          </Button>
        </ScrollView>
        <BottomNavBar />
      </KeyboardAvoidingView>
    </Provider>
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
  textInput: {
    flex: 1,
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
  },
  button: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingHorizontal: wp(2),
    paddingVertical: hp(1.5),
    marginBottom: hp(2),
  },
});

export default Profile;