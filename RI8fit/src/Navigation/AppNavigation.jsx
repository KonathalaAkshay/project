import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { Center, NativeBaseProvider, Spinner } from 'native-base';

import HomeCard from '../Screens/HomeCard/HomeCard';
import Profile from '../Screens/Profile/Profile';
import SignUp from '../Screens/SignUp/SignUp';
import SkillsPage from '../Screens/SignUp/SkillsPage';
import ResumeUpload from '../Screens/SignUp/ResumeUpload';
import Login from '../Screens/Login/Login';
import Register from '../Screens/Register/Register';
import BasicDetails from '../Screens/Register/BasicDetails';
import EducationDetails from '../Screens/Register/EducationDetails';
import Resume from '../Screens/Register/Resume';
import VerifyOTP from '../Screens/SignUp/VerifyOTP';
import Education from '../Screens/SignUp/Education';
import EmploymentDetail from '../Screens/Register/EmploymentDetail';
import ProfileView from '../Screens/Profile/ProfileView';

import EditBasicDetailsScreen from '../Screens/Profile/EditScreens/EditBasicDetailsScreen';
import EditEducationScreen from '../Screens/Profile/EditScreens/EditEducationScreen';
import EditExperienceScreen from '../Screens/Profile/EditScreens/EditExperienceScreen';
import EditSkillsScreen from '../Screens/Profile/EditScreens/EditSkillsScreen';
import EditResumeScreen from '../Screens/Profile/EditScreens/EditResumeScreen';

import { UserProvider } from '../Context/UserContext';
import { CandidateProvider } from '../Context/CandidateContext';
import { AuthProvider, useAuth } from '../Context/AuthContext';
import CompleteSubmit from '../Screens/Register/CompleteSubmit';
import ResumeLoader from '../Store/ResumeLoader/ResumeLoader';

const Stack = createNativeStackNavigator();

// Auth stack (unauthenticated users)
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="EmploymentDetail" component={EmploymentDetail} />
      <Stack.Screen name="EducationDetails" component={EducationDetails} />
      <Stack.Screen name="ResumeLoader" component={ResumeLoader} />
    </Stack.Navigator>
  );
};

// App stack (authenticated users)
const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeCard" component={HomeCard} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="SkillsPage" component={SkillsPage} />
      <Stack.Screen name="ResumeUpload" component={ResumeUpload} />
      <Stack.Screen name="Education" component={Education} />
      <Stack.Screen name="BasicDetails" component={BasicDetails} />
      <Stack.Screen name="EmploymentDetail" component={EmploymentDetail} />
      <Stack.Screen name="EducationDetails" component={EducationDetails} />
      <Stack.Screen name="Resume" component={Resume} />
      <Stack.Screen name="ProfileView" component={ProfileView} />
      <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
      <Stack.Screen name="EditResumeScreen" component={EditResumeScreen} />

      {/* Edit Screens */}
      <Stack.Screen
        name="EditBasicDetailsScreen"
        component={EditBasicDetailsScreen}
      />
      <Stack.Screen
        name="EditEducationScreen"
        component={EditEducationScreen}
      />
      <Stack.Screen
        name="EditExperienceScreen"
        component={EditExperienceScreen}
      />
      <Stack.Screen name="EditSkillsScreen" component={EditSkillsScreen} />

      <Stack.Screen name="CompleteSubmit" component={CompleteSubmit} />
    </Stack.Navigator>
  );
};

// Root stack (decides which stack to show)
const AppStack = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <Center flex={1} bg="white">
        <Spinner size="lg" color="blue.500" />
      </Center>
    );
  }

  return isAuthenticated ? <MainStack /> : <AuthStack />;
};

// App Navigator
const AppNavigator = () => {
  return (
    <PaperProvider>
      <NativeBaseProvider>
        <AuthProvider>
          <UserProvider>
            <CandidateProvider>
              <AppStack />
            </CandidateProvider>
          </UserProvider>
        </AuthProvider>
      </NativeBaseProvider>
    </PaperProvider>
  );
};

export default AppNavigator;
