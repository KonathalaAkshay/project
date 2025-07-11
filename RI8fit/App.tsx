import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';
import Login from './Components/Login';
import OpenScreen from './Components/OpenScreen';
import HomeCard from './Components/HomeCard';
import Profile from './Components/Profile';
import SignUp from './Components/SignUp/SignUp';
import SkillsPage from './Components/SignUp/SkillsPage';
import ResumeUpload from './Components/SignUp/ResumeUpload';
import Education from './Components/SignUp/Education';

const Stack = createNativeStackNavigator();

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const theme = extendTheme({
    config: {
      initialColorMode: isDarkMode ? 'dark' : 'light',
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
        {showSplash ? (
          <OpenScreen />
        ) : (
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="HomeCard" component={HomeCard} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="SkillsPage" component={SkillsPage} />
            <Stack.Screen name="ResumeUpload" component={ResumeUpload} />
            <Stack.Screen name="Education" component={Education} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
