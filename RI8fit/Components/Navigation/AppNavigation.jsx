import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Components/Login';
import HomeCard from '../Components/HomeCard';
import Profile from '../Components/Profile';
import SignUp from '../Components/SignUp/SignUp';
import SkillsPage from '../Components/SignUp/SkillsPage';
import ResumeUpload from '../Components/SignUp/ResumeUpload';
import Education from '../Components/SignUp/Education';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="HomeCard" component={HomeCard} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SkillsPage" component={SkillsPage} />
      <Stack.Screen name="ResumeUpload" component={ResumeUpload} />
      <Stack.Screen name="Education" component={Education} />
    </Stack.Navigator>
  );
};

export default AppNavigator;