import axios from 'axios';
import React, {useState} from 'react';
import {Alert, Image} from 'react-native';
import LoginScreen from './Login';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
//   const [confirmPassword, setconfirmPassword] = useState(false);

  const validateEmail = email => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };
  const handleRegister = async () => {
    if (!name || !email || !password ) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }
    // if (password !== confirmPassword) {
    //   Alert.alert('Error', 'Passwords do not match.');
    //   return;
    // }
    setLoading(true);
    try {
      const response = await axios.post(
        'http://192.168.100.14:5000/api/users/register',
        {
          name,
          email,
          password,
        },
      );

      if (response.data.success) {
        setLoading(false);
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('Login');
      } else {
        setLoading(false);
        Alert.alert('Error', response.data.message || 'Registration failed.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Register Error:', error?.response?.data || error.message);
      Alert.alert(
        'Error',
        error?.response?.data?.message || 'Something went wrong.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image
              source={require("../Public/Logo.png")} 
              style={styles.logo}
            />
      <Text style={styles.title}>Create an Account 🚀</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor={'silver'}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={'silver'}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor={'silver'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={showPassword}
          keyboardType='default'
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;

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
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    marginLeft: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 25,
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
    height: 50,
    color: '#333',
  },
  button: {
    backgroundColor: '#6200ee',
    width: "50%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    textAlign: 'center',
    color: '#6280ee',
    marginTop: 15,
    fontSize: 16,
  },
});
