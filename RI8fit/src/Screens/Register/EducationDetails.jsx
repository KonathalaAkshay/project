/* eslint-disable react-native/no-inline-styles */
import { ScrollView, Box, Button, HStack, Icon } from 'native-base';
import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Dimensions,
  Alert,
  useColorScheme,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CandidateContext } from '../../Context/CandidateContext';

const EducationDetails = ({ navigation }) => {
  const { candidateData, setCandidateData } = useContext(CandidateContext);

  const [educationList, setEducationList] = useState([]);
  const [qualification, setQualification] = useState('');
  const [institution, setInstitution] = useState('');
  const [year, setYear] = useState('');
  const [editingId, setEditingId] = useState(null); // ✅ for edit mode

  const scrollRef = useRef(null);
  const { width, height } = Dimensions.get('window');
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const wp = percentage => (width * percentage) / 100;
  const hp = percentage => (height * percentage) / 100;

  const isValidYear = /^\d{4}$/.test(year);

  // ✅ Load education only once
  useEffect(() => {
    if (
      candidateData?.resume_data?.education?.length &&
      educationList.length === 0
    ) {
      const mappedEducation = candidateData.resume_data.education.map(
        (edu, idx) => ({
          id: `${idx}-${edu.course}`,
          qualification: edu.course,
          institution: edu.university,
          year: edu.year,
        }),
      );
      setEducationList(mappedEducation);
      setCandidateData(prev => ({
        ...prev,
        education: mappedEducation,
      }));
    }
  }, [candidateData]);

  const handleAddOrUpdate = () => {
    if (qualification.trim() && institution.trim() && isValidYear) {
      if (editingId) {
        // ✅ Update existing entry
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
        setCandidateData(prev => ({ ...prev, education: updatedList }));
        setEditingId(null);
      } else {
        // ✅ Add new entry
        const newEducation = {
          id: Date.now().toString(),
          qualification: qualification.trim(),
          institution: institution.trim(),
          year,
        };
        const updatedList = [...educationList, newEducation];
        setEducationList(updatedList);
        setCandidateData(prev => ({ ...prev, education: updatedList }));
        setTimeout(
          () => scrollRef.current?.scrollToEnd({ animated: true }),
          100,
        );
      }

      // Reset form
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
    setCandidateData(prev => ({ ...prev, education: updatedList }));

    if (editingId === id) {
      // if deleting the one being edited
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
    setCandidateData(prev => ({
      ...prev,
      education: educationList,
    }));
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

      <HStack space={3} mt={3}>
        <Button
          size="sm"
          colorScheme="blue"
          leftIcon={<Icon as={MaterialIcons} name="edit" size="sm" />}
          onPress={() => handleEditEducation(item)}
          borderRadius="lg"
        >
          Edit
        </Button>
        <Button
          size="sm"
          colorScheme="red"
          leftIcon={<Icon as={MaterialIcons} name="delete" size="sm" />}
          onPress={() => handleDeleteEducation(item.id)}
          borderRadius="lg"
        >
          Delete
        </Button>
      </HStack>
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
        {/* Card for Education Form */}
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

          {/* List of Education */}
          <FlatList
            data={educationList}
            renderItem={renderEducationItem}
            keyExtractor={item => item.id.toString()}
            style={styles.list}
            ListEmptyComponent={
              <Text
                style={{
                  marginTop: 20,
                  color: isDarkMode ? '#9CA3AF' : '#6B7280',
                  textAlign: 'center',
                }}
              >
                No education entries added yet.
              </Text>
            }
          />
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
