import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Box } from 'native-base';
import { TextInput, Menu, Button, Text } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function EducationDetails({ navigation = { navigate: () => {} } }) {
  // Dropdown data arrays
  const qualifications = ['High School', 'Diploma', 'Bachelors', 'Masters', 'PhD'];
  const courses = ['Computer Science', 'Mechanical', 'Civil', 'Electrical', 'Management'];
  const courseTypes = ['Full Time', 'Part Time', 'Distance Learning'];
  const specializations = ['AI', 'Data Science', 'Networking', 'Marketing', 'Finance'];
  const universities = ['Harvard', 'MIT', 'Stanford', 'Oxford', 'IIT Delhi'];

  // State
  const [qualification, setQualification] = useState('');
  const [course, setCourse] = useState('');
  const [courseType, setCourseType] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [university, setUniversity] = useState('');
  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState(null);

  // Menu states
  const [menu, setMenu] = useState({
    qualification: false,
    course: false,
    courseType: false,
    specialization: false,
    university: false,
  });

  // Date picker states
  const [startPickerVisible, setStartPickerVisible] = useState(false);
  const [endPickerVisible, setEndPickerVisible] = useState(false);

  // Submit handler
  const handleSubmit = () => {
    const formData = {
      qualification,
      course,
      courseType,
      specialization,
      university,
      startYear,
      endYear,
    };
    // console.log('Form Data:', formData);

    // Navigate and pass form data
    navigation.navigate('Resume', { educationDetails: formData });
  };

  // Dropdown reusable renderer
  const renderDropdown = (label, value, setValue, array, menuKey) => (
    <Menu
      visible={menu[menuKey]}
      onDismiss={() => setMenu(prev => ({ ...prev, [menuKey]: false }))}
      anchor={
        <TouchableOpacity
          onPress={() => setMenu(prev => ({ ...prev, [menuKey]: true }))}
        >
          <TextInput
            label={label}
            value={value}
            editable={false}
            style={styles.input}
            right={<TextInput.Icon icon={() => <MaterialIcons name="arrow-drop-down" size={24} />} />}
          />
        </TouchableOpacity>
      }
    >
      {array.map((item, idx) => (
        <Menu.Item
          key={idx}
          onPress={() => {
            setValue(item);
            setMenu(prev => ({ ...prev, [menuKey]: false }));
          }}
          title={item}
        />
      ))}
    </Menu>
  );

  return (
    <Box bg="white" p={4} borderRadius="2xl" shadow={3} style={styles.container}>
      <Text style={styles.header}>Education Details</Text>

      {renderDropdown('Qualification', qualification, setQualification, qualifications, 'qualification')}
      {renderDropdown('Course', course, setCourse, courses, 'course')}
      {renderDropdown('Course Type', courseType, setCourseType, courseTypes, 'courseType')}
      {renderDropdown('Specialization', specialization, setSpecialization, specializations, 'specialization')}
      {renderDropdown('University', university, setUniversity, universities, 'university')}

      {/* Starting Year */}
      <TouchableOpacity onPress={() => setStartPickerVisible(true)}>
        <TextInput
          label="Starting Year"
          value={startYear ? startYear.toString() : ''}
          editable={false}
          style={styles.input}
          right={<TextInput.Icon icon={() => <MaterialIcons name="calendar-today" size={20} />} />}
        />
      </TouchableOpacity>
      <DatePickerModal
        mode="single"
        visible={startPickerVisible}
        onDismiss={() => setStartPickerVisible(false)}
        date={startYear ? new Date(startYear, 0, 1) : undefined}
        onConfirm={params => {
          setStartYear(params.date.getFullYear());
          setStartPickerVisible(false);
        }}
      />

      {/* Ending Year */}
      <TouchableOpacity onPress={() => setEndPickerVisible(true)}>
        <TextInput
          label="Ending Year"
          value={endYear ? endYear.toString() : ''}
          editable={false}
          style={styles.input}
          right={<TextInput.Icon icon={() => <MaterialIcons name="calendar-today" size={20} />} />}
        />
      </TouchableOpacity>
      <DatePickerModal
        mode="single"
        visible={endPickerVisible}
        onDismiss={() => setEndPickerVisible(false)}
        date={endYear ? new Date(endYear, 0, 1) : undefined}
        onConfirm={params => {
          setEndYear(params.date.getFullYear());
          setEndPickerVisible(false);
        }}
      />

      {/* Save Button */}
      <Button
        mode="contained"
        style={styles.button}
        icon={() => <MaterialIcons name="save" size={20} color="white" />}
        onPress={handleSubmit}
      >
        Save And Next
      </Button>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    color: '#333',
  },
  input: {
    backgroundColor: '#f9f9f9',
    marginBottom: 12,
  },
  button: {
    marginTop: 20,
    paddingVertical: 6,
  },
});
