import {
  Box,
  Avatar,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
  ScrollView,
} from 'native-base';
import { RefreshControl, useColorScheme } from 'react-native';
import { useState, useCallback, useEffect } from 'react';
import BottomNavBar from './BottomNav';
import axios from 'axios';

const HomeCard = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [refreshing, setRefreshing] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [profile, setProfile] = useState('');
  const [experience, setExperience] = useState('');
  const [error, setError] = useState({});

  const API = 'https://randomuser.me/api';

  const fetchProfileData = async () => {  
    setRefreshing(true);
    try {
      const response = await axios.get(API);
      const user = response.data.results[0];
      setId(`${user.login.uuid}`);
      setName(`${user.name.first}`);
      setExperience(`${user.registered.age}`);
      setProfile(`${user.picture.medium}`);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError({ fetch: 'Failed to load profile data' });
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProfileData().finally(() => setRefreshing(false));
  }, []);

  const handleLogin = () => {
    navigation.navigate('Profile');
  };

  const users = [
    {
      id: id,
      name: name,
      title: 'Frontend Developer',
      experience: experience,
      skills: ['React', 'JavaScript', 'UI/UX'],
      profilePic: profile,
    },
  ];

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        marginBottom={10}
        style={{ backgroundColor: isDarkMode ? '#111827' : '#F3F4F6' }}
      >
        {users.map(user => (
          <Box
            key={user.id}
            bg={isDarkMode ? '#1F2937' : 'white'}
             borderColor={isDarkMode ? '#374151' : 'coolGray.200'}
            rounded="xl"
            shadow={4}
            p={5}
            m={4}
            borderWidth={1}
          >
            <HStack space={4} alignItems="center">
              <Avatar size="lg" source={{ uri: user.profilePic }} />
              <VStack flex={1}>
                <Text fontSize="lg" bold color={isDarkMode ? '#F3F4F6' : undefined}>
                  {user.name || 'Loading...'}
                </Text>
                <Text fontSize="sm" color={isDarkMode ? '#9CA3AF' : 'coolGray.600'}>
                  {user.title}
                </Text>
                <Text fontSize="sm" color={isDarkMode ? '#9CA3AF' : 'coolGray.600'}>
                  Experience: {user.experience || ' '} years
                </Text>
                <HStack space={1} mt={2} flexWrap="wrap">
                  {user.skills.map(skill => (
                    <Badge bg={isDarkMode ? '#374151' : undefined} colorScheme="blue" key={skill} mr={1} mt={1} _text={{ color: isDarkMode ? '#BFDBFE' : undefined }}>
                      {skill}
                    </Badge>
                  ))}
                </HStack>
              </VStack>
            </HStack>
            <Button mt={4} colorScheme="blue" onPress={handleLogin} _text={{ color: '#fff' }}>
              View Profile
            </Button>
          </Box>
        ))}
      </ScrollView>
      <BottomNavBar />
    </>
  );
};

export default HomeCard;
