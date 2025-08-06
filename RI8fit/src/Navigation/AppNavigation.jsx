import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeCard from '../Screens/HomeCard/HomeCard';
import Profile from '../Screens/Profile/Profile';
import SignUp from '../Screens/SignUp/SignUp';
import SkillsPage from '../Screens/SignUp/SkillsPage';
import ResumeUpload from '../Screens/SignUp/ResumeUpload';
import Education from '../Screens/SignUp/Education';
import Login from '../Screens/Login/Login';
import Register from '../Screens/Register/Register';

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
      <Stack.Screen name="Register" component={Register}/>
    </Stack.Navigator>
  );
};

export default AppNavigator;