import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  Text,
  Alert,
  useColorScheme,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getItem, ACCESS_TOKEN } from '../../Utils/helper';
import api from '../../API/api';

const BottomNavBar = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const activeColor = isDarkMode ? '#60A5FA' : '#2563EB';
  const inactiveColor = isDarkMode ? '#D1D5DB' : '#6B7280';

  const handlelearning = () => {
    Alert.alert('Learning');
  };

  const handleProfile = async () => {
    try {
      const token = await getItem(ACCESS_TOKEN);
      if (!token) {
        console.log('No token found');
        return;
      }

      const response = await api.get(
        '/candidate/get-candidates-complete-details',
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data?.success) {
        navigation.navigate('ProfileView', {
          candidateData: response.data.data,
        });
      } else {
        console.log('Error fetching candidate details', response.data?.message);
      }
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  // helper to check active tab
  const getColor = screenName =>
    route.name === screenName ? activeColor : inactiveColor;

  return (
    <View
      style={[
        styles.footer,
        {
          backgroundColor: isDarkMode ? '#111827' : '#FFFFFF',
          borderColor: isDarkMode ? '#374151' : '#E5E7EB',
        },
      ]}
    >
      {/* Home */}
      <Pressable
        style={styles.navItem}
        onPress={() => navigation.navigate('HomeCard')}
      >
        <MaterialIcons
          name="home-filled"
          size={26}
          color={getColor('HomeCard')}
        />
        <Text style={[styles.label, { color: getColor('HomeCard') }]}>
          Home
        </Text>
      </Pressable>

      {/* Learning */}
      <Pressable style={styles.navItem} onPress={handlelearning}>
        <MaterialIcons
          name="menu-book"
          size={26}
          color={getColor('Learning')}
        />
        <Text style={[styles.label, { color: getColor('Learning') }]}>
          Learning
        </Text>
      </Pressable>

      {/* Assessment */}
      <Pressable
        style={styles.navItem}
        onPress={() => Alert.alert('Assessment')}
      >
        <MaterialIcons
          name="assignment-turned-in"
          size={26}
          color={getColor('Assessment')}
        />
        <Text style={[styles.label, { color: getColor('Assessment') }]}>
          Assessment
        </Text>
      </Pressable>

      {/* Profile */}
      <Pressable style={styles.navItem} onPress={handleProfile}>
        <MaterialIcons
          name="person"
          size={26}
          color={getColor('ProfileView')}
        />
        <Text style={[styles.label, { color: getColor('ProfileView') }]}>
          Profile
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingBottom: 5,
    zIndex: 10,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: '500',
  },
});

export default BottomNavBar;
