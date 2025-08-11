import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Box, VStack, HStack, Radio } from 'native-base';
import { TextInput, Text, Button, Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Resume({ navigation = { navigate: () => {} } }) {
  const [resumeHeadline, setResumeHeadline] = useState('');
  const [educationCountry, setEducationCountry] = useState('');
  const [educationCity, setEducationCity] = useState('');
  const [preferredSalary, setPreferredSalary] = useState('');
  const [gender, setGender] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  const [workEligibility, setWorkEligibility] = useState('');

  const handleSubmit = () => {
    const formData = {
      resumeHeadline,
      educationCountry,
      educationCity,
      preferredSalary,
      gender,
      currentAddress,
      permanentAddress,
      workEligibility,
    };
    console.log('Form Data:', formData);
    // 👉 Replace console.log with API call
  };

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Box bg="#fff" borderRadius="lg" shadow={2} p={4}>
          <VStack space={4}>
            {/* Resume Headline */}
            <TextInput
              label="Resume Headline"
              mode="outlined"
              value={resumeHeadline}
              onChangeText={setResumeHeadline}
              left={<TextInput.Icon icon={() => <Icon name="text-fields" size={20} />} />}
            />

            {/* Education Country & City */}
            <HStack space={3}>
              <Box flex={1}>
                <TextInput
                  label="Education Country"
                  mode="outlined"
                  value={educationCountry}
                  onChangeText={setEducationCountry}
                  left={<TextInput.Icon icon={() => <Icon name="public" size={20} />} />}
                />
              </Box>
              <Box flex={1}>
                <TextInput
                  label="Education City"
                  mode="outlined"
                  value={educationCity}
                  onChangeText={setEducationCity}
                  left={<TextInput.Icon icon={() => <Icon name="location-city" size={20} />} />}
                />
              </Box>
            </HStack>

            {/* Preferred Salary */}
            <TextInput
              label="Preferred Salary"
              mode="outlined"
              value={preferredSalary}
              onChangeText={setPreferredSalary}
              keyboardType="numeric"
              left={<TextInput.Icon icon={() => <Icon name="attach-money" size={20} />} />}
            />

            {/* Gender Radio */}
            <Box>
              <Text style={styles.label}>Gender</Text>
              <Radio.Group name="gender" value={gender} onChange={setGender} flexDirection="row">
                <Radio value="Male" my={1} mr={4}>Male</Radio>
                <Radio value="Female" my={1}>Female</Radio>
              </Radio.Group>
            </Box>

            {/* Current Address */}
            <TextInput
              label="Current Address"
              mode="outlined"
              value={currentAddress}
              onChangeText={setCurrentAddress}
              left={<TextInput.Icon icon={() => <Icon name="home" size={20} />} />}
            />

            {/* Permanent Address */}
            <TextInput
              label="Permanent Address"
              mode="outlined"
              value={permanentAddress}
              onChangeText={setPermanentAddress}
              left={<TextInput.Icon icon={() => <Icon name="home-work" size={20} />} />}
            />

            {/* Work Eligibility Radio */}
            <Box>
              <Text style={styles.label}>Work Eligibility</Text>
              <Radio.Group
                name="workEligibility"
                value={workEligibility}
                onChange={setWorkEligibility}
                flexDirection="row"
              >
                <Radio value="Yes" my={1} mr={4}>Yes</Radio>
                <Radio value="No" my={1}>No</Radio>
              </Radio.Group>
            </Box>

            {/* Submit Button */}
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.submitBtn}
              icon={() => <Icon name="check-circle" size={20} color="#fff" />}
            >
              Submit
            </Button>
          </VStack>
        </Box>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  submitBtn: {
    marginTop: 16,
    paddingVertical: 6,
  },
});
