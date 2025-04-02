// import React, { useContext, useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AuthContext } from "../context/authContext";
// import { useNavigation } from "@react-navigation/native";

// const LoginScreen = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const { login , setIsAuthenticated } = useContext(AuthContext); // ✅ Get `login` function from context
//   const validateEmail = (email) => {
//     const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     return re.test(email);
//   };
//   const navigation = useNavigation();

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert("Error", "Please fill out all fields.");
//       return;
//     }
//     if (!validateEmail(email)) {
//       Alert.alert("Error", "Please enter a valid email address.");
//       return;
//     }

//     setLoading(true);
//     try {
//         const response = await fetch('http://192.168.100.14:5000/api/users/login', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ email, password }),
//         });
//         const data = await response.json();
  
//         if (response.ok) {
//           console.log('Login Successful:', data);
//           login(data.user, data.token);  // ✅ Update auth state using `login()`
//           navigation.navigate('Main')// ✅ Redirect to home screen after login
//         } else {
//           Alert.alert('Login Failed', data.message);
//         }
//       } catch (error) {
//         console.error('Login error:', error);
//       }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome Back 👋</Text>
//       <Text style={styles.subtitle}>Login to your account</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//       />

//       <View style={styles.passwordContainer}>
//         <TextInput
//           style={styles.passwordInput}
//           placeholder="Password"
//           placeholderTextColor={'gray'}
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry={showPassword}
//         />
//         <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//           <Icon
//             name={showPassword ? "eye-off" : "eye"}
//             size={24}
//             color="gray"
//           />
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
//         <Text style={styles.buttonText}>{loading ? "Logging in..." : "Login"}</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => navigation.navigate("Register")}>
//         <Text style={styles.link}>Don't have an account? Sign up</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     paddingHorizontal: 20,
//     backgroundColor: "#f0f0f5",
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 5,
//     color: "#333",
//   },
//   subtitle: {
//     fontSize: 16,
//     textAlign: "center",
//     color: "#666",
//     marginBottom: 20,
//   },
//   input: {
//     height: 50,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     marginBottom: 15,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   passwordContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     marginBottom: 15,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   passwordInput: {
//     flex: 1,
//     height: 50,
//   },
//   button: {
//     backgroundColor: "#6200ee",
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     shadowColor: "#6200ee",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   link: {
//     textAlign: "center",
//     color: "#6200ee",
//     marginTop: 15,
//     fontSize: 16,
//   },
// });



import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../context/authContext";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { body, header } from "express-validator";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext); // ✅ Get `login` function from context
  const navigation = useNavigation();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
        const response = await axios.post('http://192.168.100.14:5000/api/users/login', 
            { email, password }, // Data goes here
            {
              headers: { 'Content-Type': 'application/json' }, // Headers go here
            }
          );
      const data = response.data;

      if (response.status === 200) {
        console.log('Login Successful:', data);
        login(data.user, data.token);  // ✅ Update auth state using `login()`
        navigation.navigate('Main'); // ✅ Redirect to home screen after login
      } else {
        Alert.alert('Login Failed', data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Error', 'An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../Public/Logo.png")} 
        style={styles.logo}
      />

      <Text style={styles.title}>Welcome Back 👋</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={"gray"}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password Input */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor={"gray"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          keyboardType="default"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      {/* Signup Link */}
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.3))",
    borderRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    justifyContent: "center",
    marginLeft: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
    fontWeight: "semi-bold",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "#ddd",
    marginBottom: 15,

  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "#ddd",
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  button: {
    width: "50%",
    backgroundColor: "#6280ee",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  link: {
    marginTop: 15,
    fontSize: 16,
    color: "#007bff",
  },
});

export default LoginScreen;