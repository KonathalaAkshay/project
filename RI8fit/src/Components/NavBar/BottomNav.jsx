/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  Text,
  Alert,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BottomNavBar = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  const handleLogin = () => {
    navigation.navigate('HomeCard');
  };

  return (
    <View
      style={[
        styles.footer,
        {
          backgroundColor: isDarkMode ? 'rgb(3, 37, 84)' : ' #f9f9f9',
          borderColor: isDarkMode ? '#374151' : '#ccc',
        },
      ]}
    >
      <Pressable
        style={styles.navItem}
        onPress={handleLogin}
        accessibilityLabel="Go to Home"
      >
        <Text
          style={[styles.icon, { color: isDarkMode ? '#F3F4F6' : '#111827' }]}
        >
          🏠
        </Text>
      </Pressable>
      <Pressable
        style={styles.navItem}
        onPress={() => Alert.alert('Learning')}
        accessibilityLabel="Go to Learning"
      >
        <Text
          style={[styles.icon, { color: isDarkMode ? '#F3F4F6' : '#111827' }]}
        >
          📖
        </Text>
      </Pressable>
      <Pressable
        style={styles.navItem}
        onPress={() => Alert.alert('Assessment')}
        accessibilityLabel="Go to Assessment"
      >
        <Text
          style={[styles.icon, { color: isDarkMode ? '#F3F4F6' : '#111827' }]}
        >
          📋
        </Text>
      </Pressable>
      <Pressable
        style={styles.navItem}
        onPress={handleProfile}
        accessibilityLabel="Go to Profile"
      >
        <Text
          style={[styles.icon, { color: isDarkMode ? '#F3F4F6' : '#111827' }]}
        >
          👤
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
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    backgroundColor: '#f9f9f9',
    zIndex: 10,
  },
  navItem: {
    padding: 10,
  },
  icon: {
    fontSize: 24,
  },
});

export default BottomNavBar;
