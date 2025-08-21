/* eslint-disable react-native/no-inline-styles */
import { ScrollView, Box, Button, HStack, Icon } from 'native-base';
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
    const allEducation = [
      { qualification, institution, year },
      ...educationList,
    ].filter(e => e.qualification && e.institution && e.year);

    console.log('Final Education Data:', allEducation);
    navigation.navigate('SkillsPage', { education: allEducation });
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

      <Button
        mt={3}
        size="sm"
        colorScheme="red"
        leftIcon={<Icon as={MaterialIcons} name="delete" size="sm" />}
        onPress={() => handleDeleteEducation(item.id)}
        borderRadius="lg"
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
            Primary Education (Required)
          </Text>

          {/* First Education Inputs */}
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

          {/* Add Another Button */}
          <Button
            onPress={handleAddEducation}
            mt={4}
            colorScheme="blue"
            isDisabled={!qualification || !institution || !isValidYear}
            borderRadius="lg"
            leftIcon={<Icon as={MaterialIcons} name="school" size="sm" />}
          >
            Add Another Education
          </Button>

          {/* List of Additional Educations */}
          <FlatList
            data={educationList}
            renderItem={renderEducationItem}
            keyExtractor={item => item.id}
            style={styles.list}
            ListEmptyComponent={
              <Text
                style={{
                  marginTop: 20,
                  color: isDarkMode ? '#9CA3AF' : '#6B7280',
                  textAlign: 'center',
                }}
              >
                No additional education entries yet.
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

export default Education;
