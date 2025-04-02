// // import React, { useEffect, useState } from 'react';
// // import {NavigationContainer} from '@react-navigation/native';
// // import {createNativeStackNavigator} from '@react-navigation/native-stack';

// // import Home from './src/screens/Home';
// // import Profile from './src/screens/Profile';
// // import Search from './src/screens/Search';
// // import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// // import HomeIcon from 'react-native-vector-icons/Entypo';
// // import UserIcon from 'react-native-vector-icons/SimpleLineIcons';
// // import SearchIcon from 'react-native-vector-icons/Octicons';
// // import Login from './src/screens/Login';
// // import Register from './src/screens/Register';

// // const Stack = createNativeStackNavigator();


// //   const Tab = createBottomTabNavigator();
// // const StackNavigator = () => (
// //   <Stack.Navigator>
// //     <Stack.Screen
// //       name="Home"
// //       component={Home}
// //       options={screenOptions('Home', 'gray')}
// //     />

// //     <Stack.Screen
// //       name="Profile"
// //       component={Profile}
// //       options={screenOptions('Profile', 'darkblue')}
// //     />

// //     <Stack.Screen name="Search" component={Search} />
// //   </Stack.Navigator>
// // );

// // const screenOptions = (title, bgColor) => ({
// //   title,
// //   headerStyle: {backgroundColor: bgColor},
// //   headerTintColor: 'white',
// //   headerTitleAlign: 'center',
// //   animation: 'fade',
// //   headerTitleStyle: {fontSize: 26, fontWeight: 'bold'},
// // });
// // const TabNavigator = () => {
// //   return (
// //     <Tab.Navigator
// //       screenOptions={{
// //         tabBarActiveTintColor: 'blue',
// //         tabBarActiveBackgroundColor: 'gray',
// //         tabBarInactiveTintColor: 'silver',
// //         tabBarBadge: 1,
// //         tabBarStyle: {
// //           backgroundColor: 'gray', // Background color of tab bar
// //           height: 80, // Adjust height
// //           paddingBottom: 5, // Padding at bottom
// //           borderTopWidth: 2, // Top border width
// //           borderTopColor: 'blue', // Border color
// //         },
// //         tabBarLabelStyle: {
// //           fontSize: 14, // Text size
// //           fontWeight: 'bold', // Bold text
// //         },
// //         tabBarIconStyle: {
// //           marginTop: 5, // Adjust icon position
// //         },
// //       }}>
// //       <Tab.Screen
// //         name="Home"
// //         component={Home}
// //         options={{
// //           tabBarIcon: ({size, color}) => (
// //             <HomeIcon name="home" size={30} color={color} />
// //           ),
// //         }}
// //       />

// //       <Tab.Screen
// //         name="Profile"
// //         component={Profile}
// //         options={{
// //           tabBarIcon: ({size, color}) => (
// //             <UserIcon name="user" size={30} color={color} />
// //           ),
// //         }}
// //       />
// //       <Tab.Screen
// //         name="Search"
// //         component={Search}
// //         options={{
// //           tabBarIcon: ({size, color}) => (
// //             <SearchIcon name="search" size={30} color={color} />
// //           ),
// //         }}
// //       />
// //     </Tab.Navigator>
// //   );
// // };


// // const App = () => {
// //   const [isAuthenticated, setIsAuthenticated] = useState(null);
// //   useEffect(() => {
// //     const checkAuth = async () => {
// //       const token = await AsyncStorage.getItem("token"); // Retrieve token
// //       setIsAuthenticated(!!token); // Convert token existence to boolean
// //     };
// //     checkAuth();
// //   }, []);
// //   if (isAuthenticated === null) {
// //     return null; // Render nothing while checking for token
// //   }
// //   return (  
// //   <NavigationContainer>
// //     <Stack.Navigator screenOptions={{headerShown: false}}>
// //       {isAuthenticated? (
// //         <Stack.Screen name="Main" component={TabNavigator} />
// //       ) : (
// //         <>
// //           <Stack.Screen name="Login" component={Login} />
// //           <Stack.Screen name="Register" component={Register} />
// //         </>
// //       )}
// //       {/* <Stack.Screen name="Login" component={Login} />
// //       <Stack.Screen name="Register" component={Register} />
// //       <Stack.Screen name="Main" component={TabNavigator} /> */}
// //     </Stack.Navigator>
// //   </NavigationContainer>
// // );
// // }
// // export default App;

// import React, { useContext } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { ActivityIndicator, View } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import Home from './src/screens/Home';
// import Profile from './src/screens/Profile';
// import Search from './src/screens/Search';
// import Login from './src/screens/Login';
// import Register from './src/screens/Register';

// import HomeIcon from 'react-native-vector-icons/Entypo';
// import UserIcon from 'react-native-vector-icons/SimpleLineIcons';
// import SearchIcon from 'react-native-vector-icons/Octicons';
// import { AuthContext, AuthProvider } from './src/context/authContext';

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// const TabNavigator = () => (
//   <Tab.Navigator screenOptions={{ tabBarActiveTintColor: 'blue' }}>
//     <Tab.Screen
//       name="Home"
//       component={Home}
//       options={{
//         tabBarIcon: ({ color }) => <HomeIcon name="home" size={30} color={color} />,
//       }}
//     />
//     <Tab.Screen
//       name="Profile"
//       component={Profile}
//       options={{
//         tabBarIcon: ({ color }) => <UserIcon name="user" size={30} color={color} />,
//       }}
//     />
//     <Tab.Screen
//       name="Search"
//       component={Search}
//       options={{
//         tabBarIcon: ({ color }) => <SearchIcon name="search" size={30} color={color} />,
//       }}
//     />
//   </Tab.Navigator>
// );

// const MainNavigator = () => {
//   const { isAuthenticated } = useContext(AuthContext);

//   if (isAuthenticated === null) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="blue" />
//       </View>
//     );
//   }

//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       {isAuthenticated ? (
//         <Stack.Screen name="Main" component={TabNavigator} />
//       ) : (
//         <>
//           <Stack.Screen name="Login" component={Login} />
//           <Stack.Screen name="Register" component={Register} />
//         </>
//       )}
//     </Stack.Navigator>
//   );
// };

// const App = () => {
//   return (
//     <AuthProvider>
//       <NavigationContainer>
//         <MainNavigator />
//       </NavigationContainer>
//     </AuthProvider>
//   );
// };

// export default App;






import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, View } from 'react-native';


import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import Search from './src/screens/Search';
import Login from './src/screens/Login';
import Register from './src/screens/Register';

import HomeIcon from 'react-native-vector-icons/Entypo';
import UserIcon from 'react-native-vector-icons/SimpleLineIcons';
import SearchIcon from 'react-native-vector-icons/Octicons';
import CreateIcon from 'react-native-vector-icons/AntDesign';
import { AuthContext, AuthProvider } from './src/context/authContext';
import CreatePostScreen from './src/screens/CreatePost';
import EditPostScreen from './src/screens/EditPost';
import UserAccount from './src/screens/UserAccount';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator screenOptions={{ tabBarActiveTintColor: 'blue' }}>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ color }) => <HomeIcon name="home" size={30} color={color} />,
      }}
    />
    <Tab.Screen
      name="Search"
      component={Search}
      options={{
        tabBarIcon: ({ color }) => <SearchIcon name="search" size={30} color={color} />,
      }}
    />
    <Tab.Screen
      name="CreatePost"
      component={CreatePostScreen}
      options={{
        tabBarIcon: ({ color }) => <CreateIcon name="pluscircleo" size={28} color={color} />,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: ({ color }) => <UserIcon name="user" size={30} color={color} />,
      }}
    />
    
  </Tab.Navigator>
);

const MainNavigator = () => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log('isAuthenticated:', isAuthenticated); 
  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="EditPost" component={EditPostScreen} />
        <Stack.Screen name="UserAccount" component={UserAccount} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      )}
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;