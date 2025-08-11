import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Input,
  HStack,
  VStack,
  ScrollView,
  Badge,
  IconButton,
} from 'native-base';
import {
  TextInput,
  Menu,
  Button,
  Provider,
  Text,
  RadioButton,
} from 'react-native-paper';
import {
  View,
  RefreshControl,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const wp = percentage => (width * percentage) / 100;
const hp = percentage => (height * percentage) / 100;

const countrySuggestions = [
  'India',
  'USA',
  'UK',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'China',
  'Brazil',
  'Russia',
  'Mexico',
  'South Africa',
  'Italy',
  'Spain',
  'Netherlands',
  'Sweden',
  'Norway',
  'Finland',
  'Denmark',
  'New Zealand',
  'Singapore',
  'Malaysia',
  'Indonesia',
  'Thailand',
  'Vietnam',
  'Philippines',
  'South Korea',
  'Argentina',
  'Chile',
  'Colombia',
  'Peru',
  'Poland',
  'Belgium',
  'Switzerland',
  'Greece',
  'Portugal',
  'Egypt',
  'Nigeria',
  'Kenya',
  'Turkey',
  'Saudi Arabia',
  'UAE',
  'Qatar',
  'Kuwait',
  'Israel',
  'Iran',
  'Pakistan',
  'Bangladesh',
];

const currencyOptions = ['₹', '$', '€', '£', '¥', 'AED', 'AUD'];

const currentSalaryOptionsWithCurrency = [
  '1000',
  '2000',
  '3000',
  '400000',
  '500000',
  '600000',
  '700000',
  '800000',
  '1000000',
  '1200000',
];

const salaryBreakdownOptionsWithCurrency = [
  '1000',
  '2000',
  '3000',
  '5000',
  '450000',
  '550000',
  '650000',
  '750000',
  '850000',
  '1050000',
  '1250000',
];

const citySuggestions = [
  'Visakhapatnam',
  'New Delhi',
  'Bengaluru',
  'Mumbai',
  'Pune',
  'Chennai',
  'Hyderabad',
  'Gurugram',
  'Noida',
  'Ahmedabad',
  'Kolkata',
];

const employmentTypeOptions = ['Full Time', 'Part Time', 'Internship'];

const availableSkills = [
  'Android',
  'Java',
  'JavaScript',
  'React',
  'Node.js',
  'Python',
  'C++',
  'HTML',
  'CSS',
  'SQL',
  'PHP',
  'Angular',
  'Vue.js',
  'Ruby',
  'Swift',
  'Kotlin',
  'Django',
  'AWS',
  'Docker',
  'Machine Learning',
  'Data Science',
  'DevOps',
  'Flutter',
  'Git',
  'Laravel',
  'TypeScript',
  'SAS',
  'PROC SQL',
  'SDTM',
  'ADaM',
  'TLG',
  'EDC tools',
  'CDISC',
  'FDA Standards',
  'SAS Enterprise Guide',
];

const noticePeriodOptions = [
  'immediate joiner',
  'Less than 7days',
  'Less than 15days',
  'Less than 1Month',
  'Less Than 2Months',
  'Less Than 3Months',
];

const professionalOptions = {
  experienceLevel: ['Junior', 'Mid', 'Senior'],
  jobRole: ['Developer', 'Designer', 'Manager', 'Analyst'],
};

const EmploymentDetail = ({ navigation = { navigate: () => {} } }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [refreshing, setRefreshing] = useState(false);
  const [value, setValue] = useState('No');
  const [employmentType, setEmploymentType] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState([]);
  const [summary, setSummary] = useState('');
  const [country, setCountry] = useState('');
  const [currency, setCurrency] = useState('');
  const [currentSalary, setCurrentSalary] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('');
  const [city, setCity] = useState('');
  const [noticePeriod, setNoticePeriod] = useState('');
  const [additional, setAdditional] = useState('');
  const [report, setReport] = useState('');
  const [professionalDetails, setProfessionalDetails] = useState({
    experienceLevel: '',
    jobRole: '',
  });
  const [editField, setEditField] = useState({
    experience: false,
    report: false,
  });
  const [menuVisibility, setMenuVisibility] = useState({
    employmentType: false,
    country: false,
    city: false,
    currency: false,
    currentSalary: false,
    expectedSalary: false,
    noticePeriod: false,
    addSkill: false,
    experienceLevel: false,
    jobRole: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = 'https://randomuser.me/api/';

  useEffect(() => {
    fetchProfileData();
  }, []);

  const toTitleCase = str => {
    if (!str) return '';
    return str
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, s => s.toUpperCase())
      .trim();
  };

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_BASE_URL);
      const user = response.data.results[0];
      setExperience('5');
      setReport('10 days');
      setSummary('');
      setAdditional('');
      setSkills(['Python']);
      setCountry('India');
      setCity('Visakhapatnam');
      setEmploymentType('Full Time');
      setCurrency('₹');
      setCurrentSalary('500000');
      setExpectedSalary('650000');
      setNoticePeriod('Less than 1Month');
      setProfessionalDetails({
        experienceLevel: 'Mid',
        jobRole: 'Developer',
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      setErrors(prev => ({ ...prev, fetch: 'Failed to load profile data' }));
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdownMenu = useCallback(key => {
    setMenuVisibility(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const getAdditionalValue = useCallback(
    key => {
      switch (key) {
        case 'country':
          return country;
        case 'city':
          return city;
        case 'currency':
          return currency;
        case 'currentSalary':
          return currentSalary;
        case 'expectedSalary':
          return expectedSalary;
        case 'noticePeriod':
          return noticePeriod;
        case 'employmentType':
          return employmentType;
        default:
          return '';
      }
    },
    [
      country,
      city,
      currency,
      currentSalary,
      expectedSalary,
      noticePeriod,
      employmentType,
    ],
  );

  const handleDropdownSelect = useCallback(
    (fieldKey, value) => {
      if (fieldKey in professionalOptions) {
        setProfessionalDetails(prev => ({ ...prev, [fieldKey]: value }));
      } else {
        switch (fieldKey) {
          case 'country':
            setCountry(value);
            break;
          case 'employmentType':
            setEmploymentType(value);
            break;
          case 'city':
            setCity(value);
            break;
          case 'currency':
            setCurrency(value);
            break;
          case 'currentSalary':
            setCurrentSalary(value);
            break;
          case 'expectedSalary':
            setExpectedSalary(value);
            break;
          case 'noticePeriod':
            setNoticePeriod(value);
            break;
          default:
            break;
        }
      }
      toggleDropdownMenu(fieldKey);
      setErrors(prev => ({ ...prev, [fieldKey]: '' }));
    },
    [toggleDropdownMenu],
  );

  const handleAddSelectedSkill = useCallback(
    value => {
      if (!skills.includes(value)) {
        setSkills(prev => [...prev, value]);
      }
      toggleDropdownMenu('addSkill');
    },
    [skills, toggleDropdownMenu],
  );

  const handleSaveSummary = async () => {
    setLoading(true);
    try {
      console.log('Saving summary:', summary);
      setErrors(prev => ({ ...prev, summary: '' }));
    } catch (error) {
      console.error('Error saving summary:', error);
      setErrors(prev => ({ ...prev, summary: 'Failed to save summary' }));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSkill = async indexToDelete => {
    setLoading(true);
    try {
      const updatedSkills = skills.filter(
        (_, index) => index !== indexToDelete,
      );
      setSkills(updatedSkills);
      console.log('Updated skills:', updatedSkills);
      setErrors(prev => ({ ...prev, skills: '' }));
    } catch (error) {
      console.error('Error deleting skill:', error);
      setErrors(prev => ({ ...prev, skills: 'Failed to delete skill' }));
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProfileData().then(() => setRefreshing(false));
  }, []);

  const validateFields = () => {
    if (value !== 'Yes') return true;
    const newErrors = {};
    if (!employmentType)
      newErrors.employmentType = 'Employment Type is required';
    if (!summary) newErrors.summary = 'Summary is required';
    if (skills.length === 0)
      newErrors.skills = 'At least one skill is required';
    if (!country) newErrors.country = 'Country is required';
    if (!city) newErrors.city = 'City is required';
    if (!currency) newErrors.currency = 'Currency is required';
    if (!currentSalary) newErrors.currentSalary = 'Current Salary is required';
    if (!expectedSalary)
      newErrors.expectedSalary = 'Expected Salary is required';
    if (!noticePeriod) newErrors.noticePeriod = 'Notice Period is required';
    if (!professionalDetails.experienceLevel)
      newErrors.experienceLevel = 'Experience Level is required';
    if (!professionalDetails.jobRole)
      newErrors.jobRole = 'Job Role is required';
    if (!experience) newErrors.experience = 'Experience is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitProfile = async () => {
    if (!validateFields()) return;
    setLoading(true);
    try {
      const profileData = {
        experience,
        report,
        summary,
        professionalDetails,
        skills,
        country,
        city,
        currency,
        currentSalary,
        expectedSalary,
        noticePeriod,
        employmentType,
        additional,
      };
      console.log('Saving profile:', profileData);
      setEditField({
        experience: false,
        report: false,
      });
      setErrors(prev => ({ ...prev, submit: '' }));
    } catch (error) {
      console.error('Error saving profile:', error);
      setErrors(prev => ({ ...prev, submit: 'Failed to save profile' }));
    } finally {
      setLoading(false);
    }
    navigation.navigate('EducationDetails');
  };

  const renderEditableField = (label, value, setValue, fieldKey) => (
    <HStack alignItems="center" space={3} mb={hp(2)}>
      <Text
        style={[styles.label, { color: isDarkMode ? '#E5E7EB' : '#1F2937' }]}
      >
        {label}
      </Text>
      {editField[fieldKey] ? (
        <HStack flex={1} alignItems="center" space={2}>
          <Input
            value={value}
            onChangeText={setValue}
            placeholder={`Enter ${label.toLowerCase()}`}
            flex={1}
            style={styles.input}
            bg={isDarkMode ? '#374151' : '#FFFFFF'}
            color={isDarkMode ? '#E5E7EB' : '#1F2937'}
            borderColor={
              errors[fieldKey] ? '#EF4444' : isDarkMode ? '#6B7280' : '#D1D5DB'
            }
            _focus={{
              borderColor: errors[fieldKey] ? '#EF4444' : '#3B82F6',
              backgroundColor: isDarkMode ? '#4B5563' : '#F3F4F6',
            }}
          />
          <IconButton
            icon={<MaterialIcons name="check" size={wp(5)} color="#22C55E" />}
            onPress={() =>
              setEditField(prev => ({ ...prev, [fieldKey]: false }))
            }
            style={styles.iconButton}
            _pressed={{ bg: isDarkMode ? '#15803D' : '#BBF7D0' }}
          />
        </HStack>
      ) : (
        <HStack flex={1} alignItems="center" space={2}>
          <Text
            style={[
              styles.valueText,
              { color: isDarkMode ? '#E5E7EB' : '#1F2937' },
            ]}
          >
            {value || 'Not set'}
          </Text>
          <IconButton
            icon={<MaterialIcons name="edit" size={wp(5)} color="#3B82F6" />}
            onPress={() =>
              setEditField(prev => ({ ...prev, [fieldKey]: true }))
            }
            style={styles.iconButton}
            _pressed={{ bg: isDarkMode ? '#1E3A8A' : '#BFDBFE' }}
          />
        </HStack>
      )}
      {errors[fieldKey] && (
        <Text style={styles.errorText}>{errors[fieldKey]}</Text>
      )}
    </HStack>
  );

  return (
    <Provider>
      <KeyboardAvoidingView
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? '#111827' : '#F9FAFB' },
        ]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
              style={[
                styles.loadingText,
                { color: isDarkMode ? '#E5E7EB' : '#1F2937' },
              ]}
            >
              Loading...
            </Text>
          )}
          {Object.values(errors)
            .filter(error => error)
            .map((error, index) => (
              <Text key={`error-${index}`} style={styles.errorText}>
                {error}
              </Text>
            ))}

          <Box
            style={[
              styles.section,
              { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' },
            ]}
          >
            <Text
              style={[
                styles.sectionTitle,
                { color: isDarkMode ? '#E5E7EB' : '#1F2937' },
              ]}
            >
              Profile Completion Required
            </Text>
            <RadioButton.Group
              onValueChange={newValue => {
                setValue(newValue);
                setErrors({});
              }}
              value={value}
            >
              <HStack space={4} alignItems="center">
                <HStack alignItems="center">
                  <RadioButton value="Yes" color="#3B82F6" />
                  <Text
                    style={[
                      styles.radioText,
                      { color: isDarkMode ? '#E5E7EB' : '#1F2937' },
                    ]}
                  >
                    Yes
                  </Text>
                </HStack>
                <HStack alignItems="center">
                  <RadioButton value="No" color="#3B82F6" />
                  <Text
                    style={[
                      styles.radioText,
                      { color: isDarkMode ? '#E5E7EB' : '#1F2937' },
                    ]}
                  >
                    No
                  </Text>
                </HStack>
              </HStack>
            </RadioButton.Group>
          </Box>

          <Box
            style={[
              styles.section,
              { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' },
            ]}
          >
            <Text
              style={[
                styles.sectionTitle,
                { color: isDarkMode ? '#E5E7EB' : '#1F2937' },
              ]}
            >
              Employment Type
            </Text>
            <VStack space={hp(1)}>
              <Menu
                visible={menuVisibility.employmentType}
                onDismiss={() => toggleDropdownMenu('employmentType')}
                anchor={
                  <TextInput
                    label="Employment Type"
                    value={employmentType}
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
                        onPress={() => toggleDropdownMenu('employmentType')}
                      />
                    }
                    style={[
                      styles.textInput,
                      errors.employmentType && styles.errorInput,
                    ]}
                    textColor={isDarkMode ? '#E5E7EB' : '#1F2937'}
                    placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
                    onPressIn={() => toggleDropdownMenu('employmentType')}
                  />
                }
                contentStyle={styles.menuContent}
              >
                {employmentTypeOptions.map(item => (
                  <Menu.Item
                    key={item}
                    onPress={() => handleDropdownSelect('employmentType', item)}
                    title={item}
                    titleStyle={styles.menuItem}
                  />
                ))}
              </Menu>
              {errors.employmentType && (
                <Text style={styles.errorText}>{errors.employmentType}</Text>
              )}
            </VStack>

            <Box
              style={[
                styles.section,
                { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' },
              ]}
            >
              {renderEditableField(
                'Experience',
                experience,
                setExperience,
                'experience',
              )}
            </Box>
          </Box>

          <Box
            style={[
              styles.section,
              { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' },
            ]}
          >
            <Text
              style={[
                styles.sectionTitle,
                { color: isDarkMode ? '#E5E7EB' : '#1F2937' },
              ]}
            >
              Job Profile
            </Text>
            <TextInput
              value={summary}
              onChangeText={setSummary}
              placeholder="Write a brief summary about yourself..."
              multiline
              numberOfLines={4}
              style={[styles.textInput, errors.summary && styles.errorInput]}
              textColor={isDarkMode ? '#E5E7EB' : '#1F2937'}
              placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
            />
            {errors.summary && (
              <Text style={styles.errorText}>{errors.summary}</Text>
            )}
            <Button
              mode="contained"
              onPress={handleSaveSummary}
              style={styles.button}
              labelStyle={styles.buttonLabel}
              disabled={loading}
            >
              Save Summary
            </Button>
          </Box>

          <Box
            style={[
              styles.section,
              { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' },
            ]}
          >
            <Text
              style={[
                styles.sectionTitle,
                { color: isDarkMode ? '#E5E7EB' : '#1F2937' },
              ]}
            >
              Skills
            </Text>
            <HStack space={3} mb={hp(2)}>
              <Menu
                visible={menuVisibility.addSkill}
                onDismiss={() => toggleDropdownMenu('addSkill')}
                anchor={
                  <Button
                    mode="contained"
                    onPress={() => toggleDropdownMenu('addSkill')}
                    style={styles.button}
                    labelStyle={styles.buttonLabel}
                    icon="plus"
                    disabled={loading}
                  >
                    Add Skill
                  </Button>
                }
                contentStyle={styles.menuContent}
              >
                {availableSkills.map(item => (
                  <Menu.Item
                    key={item}
                    onPress={() => handleAddSelectedSkill(item)}
                    title={item}
                    titleStyle={styles.menuItem}
                    disabled={skills.includes(item)}
                  />
                ))}
              </Menu>
            </HStack>
            <HStack flexWrap="wrap" space={2}>
              {skills.map((item, index) => (
                <Badge
                  key={index}
                  style={[
                    styles.badge,
                    { backgroundColor: isDarkMode ? '#4B5563' : '#DBEAFE' },
                  ]}
                >
                  <HStack space={2} alignItems="center">
                    <Text
                      style={[
                        styles.badgeText,
                        { color: isDarkMode ? '#BFDBFE' : '#2563EB' },
                      ]}
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
                      style={styles.badgeIcon}
                      _pressed={{ bg: isDarkMode ? '#7F1D1D' : '#FECACA' }}
                    />
                  </HStack>
                </Badge>
              ))}
            </HStack>
            {errors.skills && (
              <Text style={styles.errorText}>{errors.skills}</Text>
            )}
          </Box>

          <Box
            style={[
              styles.section,
              { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' },
            ]}
          >
            <Text
              style={[
                styles.sectionTitle,
                { color: isDarkMode ? '#E5E7EB' : '#1F2937' },
              ]}
            >
              Salary Details
            </Text>
            <VStack space={hp(1.5)}>
              {[
                'currency',
                'currentSalary',
                'expectedSalary',
                'noticePeriod',
              ].map(key => (
                <VStack key={key}>
                  <Menu
                    visible={menuVisibility[key]}
                    onDismiss={() => toggleDropdownMenu(key)}
                    anchor={
                      <TextInput
                        label={toTitleCase(key)}
                        value={getAdditionalValue(key)}
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
                          errors[key] && styles.errorInput,
                        ]}
                        textColor={isDarkMode ? '#E5E7EB' : '#1F2937'}
                        placeholderTextColor={
                          isDarkMode ? '#9CA3AF' : '#6B7280'
                        }
                        onPressIn={() => toggleDropdownMenu(key)}
                      />
                    }
                    contentStyle={styles.menuContent}
                  >
                    {(key === 'currency'
                      ? currencyOptions
                      : key === 'currentSalary'
                      ? currentSalaryOptionsWithCurrency
                      : key === 'expectedSalary'
                      ? salaryBreakdownOptionsWithCurrency
                      : noticePeriodOptions
                    ).map(item => (
                      <Menu.Item
                        key={item}
                        onPress={() => handleDropdownSelect(key, item)}
                        title={item}
                        titleStyle={styles.menuItem}
                      />
                    ))}
                  </Menu>
                  {errors[key] && (
                    <Text style={styles.errorText}>{errors[key]}</Text>
                  )}
                </VStack>
              ))}
            </VStack>
          </Box>

          <Box
            style={[
              styles.section,
              { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' },
            ]}
          >
            <Text
              style={[
                styles.sectionTitle,
                { color: isDarkMode ? '#E5E7EB' : '#1F2937' },
              ]}
            >
              Location
            </Text>
            <VStack space={hp(1.5)}>
              {['country', 'city'].map(key => (
                <VStack key={key}>
                  <Menu
                    visible={menuVisibility[key]}
                    onDismiss={() => toggleDropdownMenu(key)}
                    anchor={
                      <TextInput
                        label={toTitleCase(key)}
                        value={getAdditionalValue(key)}
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
                          errors[key] && styles.errorInput,
                        ]}
                        textColor={isDarkMode ? '#E5E7EB' : '#1F2937'}
                        placeholderTextColor={
                          isDarkMode ? '#9CA3AF' : '#6B7280'
                        }
                        onPressIn={() => toggleDropdownMenu(key)}
                      />
                    }
                    contentStyle={styles.menuContent}
                  >
                    {(key === 'country'
                      ? countrySuggestions
                      : citySuggestions
                    ).map(item => (
                      <Menu.Item
                        key={item}
                        onPress={() => handleDropdownSelect(key, item)}
                        title={item}
                        titleStyle={styles.menuItem}
                      />
                    ))}
                  </Menu>
                  {errors[key] && (
                    <Text style={styles.errorText}>{errors[key]}</Text>
                  )}
                </VStack>
              ))}
            </VStack>
          </Box>

          <Box
            style={[
              styles.section,
              { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' },
            ]}
          >
            <Text
              style={[
                styles.sectionTitle,
                { color: isDarkMode ? '#E5E7EB' : '#1F2937' },
              ]}
            >
              Professional Details
            </Text>
            <VStack space={hp(1.5)}>
              {Object.keys(professionalOptions).map(key => (
                <VStack key={key}>
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
                          errors[key] && styles.errorInput,
                        ]}
                        textColor={isDarkMode ? '#E5E7EB' : '#1F2937'}
                        placeholderTextColor={
                          isDarkMode ? '#9CA3AF' : '#6B7280'
                        }
                        onPressIn={() => toggleDropdownMenu(key)}
                      />
                    }
                    contentStyle={styles.menuContent}
                  >
                    {professionalOptions[key].map(item => (
                      <Menu.Item
                        key={item}
                        onPress={() => handleDropdownSelect(key, item)}
                        title={item}
                        titleStyle={styles.menuItem}
                      />
                    ))}
                  </Menu>
                  {errors[key] && (
                    <Text style={styles.errorText}>{errors[key]}</Text>
                  )}
                </VStack>
              ))}
            </VStack>
          </Box>

          <Box
            style={[
              styles.section,
              { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' },
            ]}
          >
            <Text
              style={[
                styles.sectionTitle,
                { color: isDarkMode ? '#E5E7EB' : '#1F2937' },
              ]}
            >
              Additional Details
            </Text>
            <TextInput
              value={additional}
              onChangeText={setAdditional}
              placeholder="Add any additional information..."
              multiline
              numberOfLines={4}
              style={styles.textInput}
              textColor={isDarkMode ? '#E5E7EB' : '#1F2937'}
              placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
            />
          </Box>

          <Button
            mode="contained"
            onPress={handleSubmitProfile}
            style={styles.button}
            labelStyle={styles.buttonLabel}
            disabled={loading}
          >
            Save and Next
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(3),
    paddingBottom: hp(12),
  },
  section: {
    borderRadius: 16,
    padding: wp(5),
    marginBottom: hp(2.5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: wp(5.5),
    fontWeight: '600',
    marginBottom: hp(2),
  },
  textInput: {
    fontSize: wp(4.2),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(4),
    backgroundColor: 'transparent',
  },
  errorInput: {
    borderColor: '#EF4444',
  },
  button: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
    marginVertical: hp(2),
  },
  buttonLabel: {
    fontSize: wp(4.5),
    fontWeight: '600',
    color: '#FFFFFF',
  },
  label: {
    fontSize: wp(4.2),
    fontWeight: '500',
    width: '30%',
  },
  valueText: {
    fontSize: wp(4.2),
    flex: 1,
  },
  iconButton: {
    borderRadius: 20,
    padding: wp(2),
  },
  radioText: {
    fontSize: wp(4),
    marginLeft: wp(2),
  },
  loadingText: {
    fontSize: wp(4.2),
    textAlign: 'center',
    marginTop: hp(2),
  },
  errorText: {
    fontSize: wp(3.5),
    color: '#EF4444',
    marginTop: hp(0.5),
  },
  badge: {
    borderRadius: 20,
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
  },
  badgeText: {
    fontSize: wp(3.8),
    fontWeight: '500',
  },
  badgeIcon: {
    padding: wp(1),
  },
  menuContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: hp(1),
  },
  menuItem: {
    fontSize: wp(4),
    color: '#1F2937',
  },
});

export default EmploymentDetail;
