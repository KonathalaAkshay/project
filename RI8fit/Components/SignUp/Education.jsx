/* eslint-disable react-native/no-inline-styles */
import { ScrollView, Box, Button } from 'native-base';
import React, { useState, useRef } from 'react';
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

const Education = ({ navigation }) => {
  const [educationList, setEducationList] = useState([]);
  const [qualification, setQualification] = useState('');
  const [institution, setInstitution] = useState('');
  const [year, setYear] = useState('');

  const scrollRef = useRef(null);
  const { width, height } = Dimensions.get('window');
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const wp = percentage => (width * percentage) / 100;
  const hp = percentage => (height * percentage) / 100;

  const isValidYear = /^\d{4}$/.test(year);

  const handleAddEducation = () => {
    if (qualification.trim() && institution.trim() && isValidYear) {
      const newEducation = {
        id: Date.now().toString(),
        qualification: qualification.trim(),
        institution: institution.trim(),
        year,
      };
      setEducationList([...educationList, newEducation]);
      setQualification('');
      setInstitution('');
      setYear('');
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    } else {
      Alert.alert(
        'Invalid Input',
        'Please fill all fields and ensure year is a 4-digit number.',
      );
    }
  };

  const handleDeleteEducation = id => {
    setEducationList(prev => prev.filter(item => item.id !== id));
  };

  const handleSubmit = () => {
    navigation.navigate('SkillsPage');
  };

  const renderEducationItem = ({ item }) => (
    <Box
      style={[
        styles.educationItem,
        { backgroundColor: isDarkMode ? '#23272e' : '#f9f9f9' },
      ]}
    >
      <Text
        style={[
          styles.educationText,
          { color: isDarkMode ? '#F3F4F6' : '#23272e' },
        ]}
      >
        🎓 Qualification: {item.qualification}
      </Text>
      <Text
        style={[
          styles.educationText,
          { color: isDarkMode ? '#F3F4F6' : '#23272e' },
        ]}
      >
        🏫 Institution: {item.institution}
      </Text>
      <Text
        style={[
          styles.educationText,
          { color: isDarkMode ? '#F3F4F6' : '#23272e' },
        ]}
      >
        📅 Year: {item.year}
      </Text>
      <Button
        size="sm"
        mt={2}
        colorScheme="red"
        onPress={() => handleDeleteEducation(item.id)}
        borderRadius={10}
        width="40%"
      >
        Delete
      </Button>
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
          p={wp(4)}
          mb={hp(2)}
          style={[
            styles.boxShadow,
            { backgroundColor: isDarkMode ? '#1F2937' : '#fff' },
          ]}
          alignItems="flex-start"
          mt={4}
        >
          <Text
            style={[
              styles.title,
              { color: isDarkMode ? '#F3F4F6' : '#111827' },
            ]}
          >
            Add Education
          </Text>

          <Text
            style={[
              styles.label,
              { color: isDarkMode ? '#E5E7EB' : '#23272e' },
            ]}
          >
            Qualification:
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDarkMode ? '#23272e' : '#fff',
                color: isDarkMode ? '#F3F4F6' : '#23272e',
              },
            ]}
            placeholder="e.g., B.Sc Computer Science"
            placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
            value={qualification}
            onChangeText={text => setQualification(text.trimStart())}
          />

          <Text
            style={[
              styles.label,
              { color: isDarkMode ? '#E5E7EB' : '#23272e' },
            ]}
          >
            Institution:
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDarkMode ? '#23272e' : '#fff',
                color: isDarkMode ? '#F3F4F6' : '#23272e',
              },
            ]}
            placeholder="e.g., XYZ University"
            placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
            value={institution}
            onChangeText={text => setInstitution(text.trimStart())}
          />

          <Text
            style={[
              styles.label,
              { color: isDarkMode ? '#E5E7EB' : '#23272e' },
            ]}
          >
            Year:
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDarkMode ? '#23272e' : '#fff',
                color: isDarkMode ? '#F3F4F6' : '#23272e',
              },
            ]}
            placeholder="e.g., 2023"
            placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
            value={year}
            onChangeText={setYear}
            keyboardType="numeric"
            maxLength={4}
          />

          <Button
            onPress={handleAddEducation}
            mt={2}
            colorScheme="blue"
            isDisabled={!qualification || !institution || !isValidYear}
            borderRadius={10}
          >
            Add Education
          </Button>

          <FlatList
            data={educationList}
            renderItem={renderEducationItem}
            keyExtractor={item => item.id}
            style={styles.list}
            ListEmptyComponent={
              <Text
                style={{
                  marginTop: 20,
                  color: isDarkMode ? '#9CA3AF' : '#23272e',
                }}
              >
                No education entries added yet.
              </Text>
            }
          />
        </Box>

        <Button
          mt={10}
          onPress={handleSubmit}
          alignSelf="flex-end"
          bg="#3B82F6"
          _text={{ color: '#FFFFFF' }}
          borderRadius={100}
          px={8}
        >
          Next
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
    fontSize: 16,
  },
  list: {
    marginTop: 20,
    width: '100%',
  },
  educationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderRadius: 10,
    marginBottom: 10,
  },
  educationText: {
    fontSize: 16,
    marginBottom: 2,
  },
});

export default Education;
