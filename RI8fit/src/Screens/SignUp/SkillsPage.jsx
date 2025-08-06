/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  Box,
  HStack,
  VStack,
  ScrollView,
  IconButton,
  Badge,
  // Text as NBText,
} from 'native-base';
import { Button, TextInput } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  StyleSheet,
  useWindowDimensions,
  useColorScheme,
  View,
  Text,
} from 'react-native';

const SkillsPage = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [inputText, setInputText] = useState('');
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const { width, height } = useWindowDimensions();

  const wp = percentage => (width * percentage) / 100;
  const hp = percentage => (height * percentage) / 100;

  const handleAddSkill = () => {
    if (inputText.trim() === '') return;
    setLoading(true);
    setSkills(prev => [...prev, inputText.trim()]);
    setInputText('');
    setTimeout(() => setLoading(false), 300);
  };

  const handleDeleteSkill = index => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    navigation.navigate('Profile');
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: isDarkMode ? '#111827' : '#F3F4F6' }}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: hp(5) }}>
        <Box
          borderRadius="2xl"
          shadowColor={isDarkMode ? '#374151' : '#E5E7EB'}
          shadow={4}
          p={5}
          m={4}
          borderWidth={1}
          mt={4}
          mb={hp(2)}
          style={styles.boxShadow}
          bg={isDarkMode ? '#1F2937' : '#FFFFFF'}
        >
          <Text
            style={[
              styles.title,
              { color: isDarkMode ? '#F3F4F6' : '#23272e' },
            ]}
          >
            Add Skills
          </Text>

          <HStack mt={hp(2)} space={2}>
            <TextInput
              mode="outlined"
              placeholder="e.g., React Native"
              value={inputText}
              onChangeText={setInputText}
              style={[
                styles.textInput,
                {
                  backgroundColor: isDarkMode ? ' #4B5563' : ' #FFFFFF',
                  flex: 1,
                },
              ]}
              theme={{
                colors: {
                  primary: '#3B82F6',
                  text: isDarkMode ? ' #E5E7EB' : ' #1F2937',
                  placeholder: isDarkMode ? ' #9CA3AF' : ' #6B7280',
                },
              }}
            />
            <Button
              mode="contained"
              onPress={handleAddSkill}
              loading={loading}
              style={styles.addButton}
              labelStyle={{ color: '#FFFFFF', fontSize: wp(3.8) }}
            >
              Add
            </Button>
          </HStack>

          <VStack space={2} mt={hp(3)}>
            {skills.length === 0 ? (
              <Text style={{ color: isDarkMode ? '#9CA3AF' : '#6B7280', fontSize: 14 }}>
                No skills added yet.
              </Text>
            ) : (
              skills.map((skill, index) => (
                <HStack key={index} alignItems="center">
                  <Badge
                    bg={isDarkMode ? '#4B5563' : '#BFDBFE'}
                    borderRadius="full"
                    px={wp(3)}
                    py={hp(1)}
                    mr={2}
                    _text={{
                      color: isDarkMode ? '#BFDBFE' : '#2563EB',
                      fontSize: wp(3.8),
                    }}
                  >
                    <HStack alignItems="center" space={2}>
                      <Text
                        style={{
                          color: isDarkMode ? '#BFDBFE' : '#2563EB',
                          fontSize: wp(3.8),
                        }}
                      >
                        {skill}
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
                        _pressed={{ bg: isDarkMode ? '#7F1D1D' : '#FECACA' }}
                        size="sm"
                      />
                    </HStack>
                  </Badge>
                </HStack>
              )
))}

          </VStack>
        </Box>

        <Button
          onPress={handleSubmit}
          mode="contained"
          style={styles.saveButton}
          labelStyle={{
            fontSize: wp(4.5),
            fontWeight: 'bold',
            color: '#FFFFFF',
          }}
          disabled={loading}
        >
          Save
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    justifyContent: 'center',
  },
  saveButton: {
    marginTop: 30,
    alignSelf: 'flex-end',
    backgroundColor: '#3B82F6',
    borderRadius: 100,
    paddingHorizontal: 24,
  },
});

export default SkillsPage;
