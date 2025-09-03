import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { useColorScheme } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import OpenScreen from './src/Screens/OpenScreen/OpenScreen';
import AppNavigator from './src/Navigation/AppNavigation';

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
        {showSplash ? <OpenScreen /> : <AppNavigator />}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}