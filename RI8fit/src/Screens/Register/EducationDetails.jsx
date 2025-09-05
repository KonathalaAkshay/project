/* eslint-disable react-native/no-inline-styles */
import { ScrollView, Box, Button, HStack, Icon } from 'native-base';
import React, { useState, useRef, useCallback } from 'react';
import {
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Dimensions,
  Alert,
  useColorScheme,
  View,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import api from '../../API/api';
import { getItem, ACCESS_TOKEN } from '../../Utils/helper';

const EducationDetails = ({ navigation }) => {
  const [educationList, setEducationList] = useState([]);
  const [qualification, setQualification] = useState('');
  const [institution, setInstitution] = useState('');
  const [year, setYear] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef(null);
  const { width, height } = Dimensions.get('window');
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const wp = percentage => (width * percentage) / 100;
  const hp = percentage => (height * percentage) / 100;

  const isValidYear = /^\d{4}$/.test(year);

  // 🔹 Fetch education list from API
  const fetchEducation = useCallback(async () => {
    try {
      setLoading(true);
      const token = await getItem(ACCESS_TOKEN);
      const response = await api.get('/candidates/get-education', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const educations = response.data?.data || [];
      const mappedEducation = educations.map((edu, idx) => ({
        id: edu.id || `${idx}-${edu.course}`,
        qualification: edu.course,
        institution: edu.university,
        year: edu.end_year || edu.start_year || '',
      }));

      setEducationList(mappedEducation);
    } catch (error) {
      console.error('Error fetching education:', error);
      Alert.alert(
        'Error',
        'Failed to fetch education details. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔹 Refresh data whenever screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchEducation();
    }, [fetchEducation]),
  );

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

  const handleAddOrUpdate = () => {
    if (qualification.trim() && institution.trim() && isValidYear) {
      if (editingId) {
        const updatedList = educationList.map(item =>
          item.id === editingId
            ? {
                ...item,
                qualification: qualification.trim(),
                institution: institution.trim(),
                year,
              }
            : item,
        );
        setEducationList(updatedList);
        setEditingId(null);
      } else {
        const newEducation = {
          id: Date.now().toString(),
          qualification: qualification.trim(),
          institution: institution.trim(),
          year,
        };
        const updatedList = [...educationList, newEducation];
        setEducationList(updatedList);
        setTimeout(
          () => scrollRef.current?.scrollToEnd({ animated: true }),
          100,
        );
      }
      setQualification('');
      setInstitution('');
      setYear('');
    } else {
      Alert.alert(
        'Invalid Input',
        'Please fill all fields and ensure year is a 4-digit number.',
      );
    }
  };

  const handleDeleteEducation = id => {
    const updatedList = educationList.filter(item => item.id !== id);
    setEducationList(updatedList);

    if (editingId === id) {
      setEditingId(null);
      setQualification('');
      setInstitution('');
      setYear('');
    }
  };

  const handleEditEducation = item => {
    setEditingId(item.id);
    setQualification(item.qualification);
    setInstitution(item.institution);
    setYear(item.year);
  };

  const handleSubmit = () => {
    navigation.navigate('EmploymentDetail');
  };

  const renderEducationItem = ({ item }) => (
    <Box
      style={[
        styles.educationItem,
        {
          backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
          shadowColor: isDarkMode ? '#000' : '#ccc',
        },
      ]}
    >
      <Text
        style={[
          styles.educationText,
          { color: isDarkMode ? '#F3F4F6' : '#111827' },
        ]}
      >
        🎓 {item.qualification}
      </Text>
      <Text
        style={[
          styles.educationText,
          { color: isDarkMode ? '#F3F4F6' : '#374151' },
        ]}
      >
        🏫 {item.institution}
      </Text>
      <Text
        style={[
          styles.educationText,
          { color: isDarkMode ? '#F3F4F6' : '#6B7280' },
        ]}
      >
        📅 {item.year}
      </Text>
    </Box>
  );

  return (
    <View
      style={{ flex: 1, backgroundColor: isDarkMode ? '#111827' : '#F3F4F6' }}
    >
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: hp(5) }}
      >
        <Box
          borderRadius="2xl"
          p={wp(5)}
          mb={hp(2)}
          style={[
            styles.boxShadow,
            { backgroundColor: isDarkMode ? '#1F2937' : '#fff' },
          ]}
          mt={5}
        >
          <Text
            style={[
              styles.title,
              { color: isDarkMode ? '#F3F4F6' : '#111827' },
            ]}
          >
            {editingId ? 'Edit Education' : 'Add Education'}
          </Text>

          {/* Qualification */}
          <Text
            style={[
              styles.label,
              { color: isDarkMode ? '#E5E7EB' : '#23272e' },
            ]}
          >
            Qualification
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDarkMode ? '#23272e' : '#fff',
                color: isDarkMode ? '#F3F4F6' : '#111827',
              },
            ]}
            placeholder="e.g., B.Sc Computer Science"
            placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
            value={qualification}
            onChangeText={text => setQualification(text.trimStart())}
          />

          {/* Institution */}
          <Text
            style={[
              styles.label,
              { color: isDarkMode ? '#E5E7EB' : '#23272e' },
            ]}
          >
            Institution
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDarkMode ? '#23272e' : '#fff',
                color: isDarkMode ? '#F3F4F6' : '#111827',
              },
            ]}
            placeholder="e.g., XYZ University"
            placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
            value={institution}
            onChangeText={text => setInstitution(text.trimStart())}
          />

          {/* Year */}
          <Text
            style={[
              styles.label,
              { color: isDarkMode ? '#E5E7EB' : '#23272e' },
            ]}
          >
            Year
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDarkMode ? '#23272e' : '#fff',
                color: isDarkMode ? '#F3F4F6' : '#111827',
              },
            ]}
            placeholder="e.g., 2023"
            placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
            value={year}
            onChangeText={setYear}
            keyboardType="numeric"
            maxLength={4}
          />

          {/* Add / Update Button */}
          <Button
            onPress={handleAddOrUpdate}
            mt={4}
            colorScheme={editingId ? 'orange' : 'blue'}
            isDisabled={!qualification || !institution || !isValidYear}
            borderRadius="lg"
            leftIcon={
              <Icon
                as={MaterialIcons}
                name={editingId ? 'update' : 'school'}
                size="sm"
              />
            }
          >
            {editingId ? 'Update Education' : 'Add Education'}
          </Button>

          {/* Loader */}
          {loading && (
            <ActivityIndicator
              size="large"
              color="#3B82F6"
              style={{ marginTop: 20 }}
            />
          )}

          {/* List of Education */}
          <FlatList
            data={educationList}
            renderItem={renderEducationItem}
            keyExtractor={item => item.id.toString()}
            style={styles.list}
            ListEmptyComponent={
              !loading && (
                <Text
                  style={{
                    marginTop: 20,
                    color: isDarkMode ? '#9CA3AF' : '#6B7280',
                    textAlign: 'center',
                  }}
                >
                  No education entries added yet.
                </Text>
              )
            }
          />

          <HStack space={3} mt={3}>
            <Button
              size="sm"
              colorScheme="blue"
              leftIcon={<Icon as={MaterialIcons} name="edit" size="sm" />}
              onPress={goEditEducation}
              borderRadius="lg"
            >
              Edit
            </Button>
            {/* Example delete button (currently needs an item id to work properly) */}
            <Button
              size="sm"
              colorScheme="red"
              leftIcon={<Icon as={MaterialIcons} name="delete" size="sm" />}
              onPress={() => Alert.alert('Select an item to delete from list')}
              borderRadius="lg"
            >
              Delete
            </Button>
          </HStack>
        </Box>

        {/* Next Button */}
        <HStack justifyContent="flex-end" px={6} mt={6}>
          <Button
            onPress={handleSubmit}
            bg="#3B82F6"
            _pressed={{ bg: '#2563EB' }}
            _text={{ color: '#fff', fontWeight: 'bold', letterSpacing: 0.5 }}
            borderRadius="lg"
            px={10}
            py={3}
            rightIcon={
              <Icon as={MaterialIcons} name="arrow-forward" size="sm" />
            }
          >
            Next
          </Button>
        </HStack>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    padding: 12,
    marginBottom: 14,
    borderRadius: 10,
    fontSize: 15,
  },
  list: {
    marginTop: 20,
    width: '100%',
  },
  educationItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  educationText: {
    fontSize: 15,
    marginBottom: 2,
  },
});

export default EducationDetails;
