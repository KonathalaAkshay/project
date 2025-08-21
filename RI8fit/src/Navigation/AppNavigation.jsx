import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeCard from '../Screens/HomeCard/HomeCard';
import Profile from '../Screens/Profile/Profile';
import SignUp from '../Screens/SignUp/SignUp';
import SkillsPage from '../Screens/SignUp/SkillsPage';
import ResumeUpload from '../Screens/SignUp/ResumeUpload';
import Login from '../Screens/Login/Login';
import Register from '../Screens/Register/Register';
import BasicDetails from '../Screens/Register/BasicDetails';
import EducationDetails from '../Screens/Register/EducationDetails';
import { PaperProvider } from 'react-native-paper';
import { NativeBaseProvider } from 'native-base';
import Resume from '../Screens/Register/Resume';
import VerifyOTP from '../Screens/SignUp/VerifyOTP';
import { UserProvider } from '../Context/UserContext';
import Education from '../Screens/SignUp/Education';
import EmploymentDetail from '../Screens/Register/EmploymentDetail';
import { CandidateProvider } from '../Context/CandidateContext';
import ProfileView from '../Screens/Profile/ProfileView';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <PaperProvider>
      <NativeBaseProvider>
        <UserProvider>
          <CandidateProvider>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="HomeCard"
                component={HomeCard}
                options={{
                  title: 'Home',
                  headerShown: true,
                }}
              />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="SkillsPage" component={SkillsPage} />
              <Stack.Screen name="ResumeUpload" component={ResumeUpload} />
              <Stack.Screen name="Education" component={Education} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="ProfileView" component={ProfileView} />
              <Stack.Screen name="BasicDetails" component={BasicDetails} />
              <Stack.Screen
                name="EmploymentDetail"
                component={EmploymentDetail}
              />
              <Stack.Screen
                name="EducationDetails"
                component={EducationDetails}
              />
              <Stack.Screen name="Resume" component={Resume} />
              <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
            </Stack.Navigator>
          </CandidateProvider>
        </UserProvider>
      </NativeBaseProvider>
    </PaperProvider>
  );
};

export default AppNavigator;

// import React, { useEffect, useState } from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { ActivityIndicator, View } from 'react-native';

// import HomeCard from '../Screens/HomeCard/HomeCard';
// import Profile from '../Screens/Profile/Profile';
// import SignUp from '../Screens/SignUp/SignUp';
// import SkillsPage from '../Screens/SignUp/SkillsPage';
// import ResumeUpload from '../Screens/SignUp/ResumeUpload';
// import Education from '../Screens/SignUp/Education';
// import Login from '../Screens/Login/Login';
// import Register from '../Screens/Register/Register';
// import BasicDetails from '../Screens/Register/BasicDetails';
// import EmploymentDetail from '../Screens/Register/EmploymentDetail';
// import EducationDetails from '../Screens/Register/EducationDetails';
// import { PaperProvider } from 'react-native-paper';
// import { NativeBaseProvider } from 'native-base';
// import Resume from '../Screens/Register/Resume';
// import VerifyOTP from '../Screens/SignUp/VerifyOTP';

// const Stack = createNativeStackNavigator();

// const AppNavigator = () => {
//   const [initialRoute, setInitialRoute] = useState(null);

//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       try {
//         const token = await AsyncStorage.getItem('authToken');
//         if (token) {
//           setInitialRoute('HomeCard'); // user already logged in
//         } else {
//           setInitialRoute('Login'); // not logged in
//         }
//       } catch (error) {
//         console.error('Error reading token', error);
//         setInitialRoute('Login');
//       }
//     };

//     checkLoginStatus();
//   }, []);

//   if (!initialRoute) {
//     // Show loading indicator while checking token
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="#000" />
//       </View>
//     );
//   }

//   return (
//     <PaperProvider>
//       <NativeBaseProvider>
//         <Stack.Navigator initialRouteName={initialRoute}>
//           <Stack.Screen
//             name="Login"
//             component={Login}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen name="HomeCard" component={HomeCard} />
//           <Stack.Screen name="Profile" component={Profile} />
//           <Stack.Screen name="SignUp" component={SignUp} />
//           <Stack.Screen name="SkillsPage" component={SkillsPage} />
//           <Stack.Screen name="ResumeUpload" component={ResumeUpload} />
//           <Stack.Screen name="Education" component={Education} />
//           <Stack.Screen name="Register" component={Register} />
//           <Stack.Screen name="BasicDetails" component={BasicDetails} />
//           <Stack.Screen name="EmploymentDetail" component={EmploymentDetail} />
//           <Stack.Screen name="EducationDetails" component={EducationDetails} />
//           <Stack.Screen name="Resume" component={Resume} />
//           <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
//         </Stack.Navigator>
//       </NativeBaseProvider>
//     </PaperProvider>
//   );
// };

// export default AppNavigator;
