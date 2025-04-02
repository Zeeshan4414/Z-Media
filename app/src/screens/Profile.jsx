// import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { CommonActions } from '@react-navigation/native';

// const Profile = ({ setIsAuthenticated}) => {
//   const handleLogout = async () => {
//     try {
//       await AsyncStorage.removeItem("token");
//       setIsAuthenticated(false);
//     } catch (error) {
//       console.error("Logout error:", error.message);
//     }
//   };
//   return (
//     <View style={{alignItems: 'center'}}>
//       <Text>Profile</Text>
//       <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
//       <Button title="Logout" onPress={handleLogout} color="red" />
//         </TouchableOpacity>
//     </View>
//   )
// }

// export default Profile

// const styles = StyleSheet.create({
//     button: {
//         backgroundColor: 'gray',
//         paddingVertical: 12,
//         paddingHorizontal: 6,
//         borderRadius: 8,
//         alignItems: 'center',

//         marginTop: 20,
//         width: 150
//       },
//       buttonText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: 'bold',
//       },
// })

import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  FlatList,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from '../context/authContext';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchProfile = async () => {
        try {
          const token = await AsyncStorage.getItem("token");
          if (!token) {
            console.log("No token found. Redirecting to Login.");
            setIsAuthenticated(false);
            return;
          }
  
          // ✅ Clear old posts before fetching new ones
          setPosts([]);
  
          // Fetch User Profile
          const { data } = await axios.get(
            "http://192.168.100.14:5000/api/users/profile",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
  
          setUser(data);
          console.log("User Profile:", data._id);
          setPosts([]); 
          // Fetch User Posts
          const postsResponse = await axios.get(
            "http://192.168.100.14:5000/api/posts/view/user",
            { headers: { Authorization: `Bearer ${token}` } }
          );
          console.log("✅ Fetched Posts for User:", postsResponse.data); // Check if posts are received

        if (postsResponse.data.length === 0) {
          console.log("⚠️ No posts received from API");
        }

        setPosts([...postsResponse.data]); // ✅ Force state update
        } catch (error) {
          console.error("Profile fetch error:", error);
  
          if (error.response?.status === 401) {
            Alert.alert("Session Expired", "Please log in again.");
            await AsyncStorage.removeItem("token");
            setIsAuthenticated(false);
          }
        } finally {
          setLoading(false);
        }
      };
  
      fetchProfile();
    }, [isAuthenticated]) // ✅ No need to depend on [posts] anymore
  );

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setUser(null); // ✅ Clear user data
      setPosts([]); // ✅ Clear posts data
      setIsAuthenticated(false);
      navigation.replace('Login'); // Ensure you have a "Login" screen
    } catch (error) {
      console.error('Logout error:', error.message);
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };
  const handleDeletePost = async postId => {
    Alert.alert('Delete Post', 'Are you sure you want to delete this post?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('token');
            await axios.delete(
              `http://192.168.100.14:5000/api/posts/delete/${postId}`,
              {
                headers: {Authorization: `Bearer ${token}`},
              },
            );

            // Update UI after deletion
            setPosts(posts.filter(post => post._id !== postId));
            Alert.alert('Deleted', 'Post has been deleted successfully.');
          } catch (error) {
            console.error('Delete error:', error);
            Alert.alert('Error', 'Failed to delete post. Try again.');
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
      ) : (
        <>
          {/* Profile Section */}
          <View style={styles.profileCard}>
            <Image
              source={{
                uri:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5uiSJcqtYzfaQdLHZv7osTthNdGPRI9_7Ow&s' ||
                  user?.profilePic,
              }}
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>{user?.name || 'User Name'}</Text>
            <Text style={styles.username}>
              @{user?.username || user?.name.split(' ')[0] + '123'}
            </Text>
            <Text style={styles.bio}>
              {user?.bio || 'This user has no bio yet.'}
            </Text>

            {/* Logout Button */}
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={20} color="white" />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>

          {/* User Posts Section */}
          <Text style={styles.sectionTitle}>Recent Posts</Text>
          <FlatList
            data={posts}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <View style={styles.postCard}>
                {item.imageUrl && (
                  <Image
                    source={{uri: item.imageUrl}}
                    style={styles.postImage}
                    resizeMode="cover"
                  />
                )}
                <Text style={styles.postTitle}>{item.title}</Text>
                <Text style={styles.postContent}>{item.description}</Text>

                <View style={styles.postFooter}>
                  <Text style={styles.postDate}>
                    {new Date(item.createdAt).toDateString()}
                  </Text>
                  <MaterialIcons
                    name="favorite-border"
                    size={20}
                    color="gray"
                  />
                  <View style={styles.postActions}>
                    {/* Edit Post Button */}
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('EditPost', {postId: item._id})
                      }
                      style={styles.iconButton}>
                      <FontAwesome name="edit" size={20} color="blue" />
                    </TouchableOpacity>

                    {/* Delete Post Button */}
                    <TouchableOpacity
                      onPress={() => handleDeletePost(item._id)}
                      style={styles.iconButton}>
                      <MaterialIcons name="delete" size={20} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 16,
  },
  loader: {
    marginTop: 50,
  },
  profileCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#007bff',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  username: {
    fontSize: 16,
    color: '#666',
  },
  bio: {
    textAlign: 'center',
    marginTop: 5,
    color: '#777',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  postCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  postImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  postContent: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  postDate: {
    fontSize: 12,
    color: '#999',
  },
  postActions: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    padding: 5,
  },
});

export default Profile;
