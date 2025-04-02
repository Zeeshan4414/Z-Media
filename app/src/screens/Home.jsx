// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const Home = () => {
//   return (
//     <View>
//       <Text>Home</Text>
//     </View>
//   )
// }

// export default Home

// const styles = StyleSheet.create({})

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  Alert,
  Pressable,
  useColorScheme,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';
import LikeIcon from 'react-native-vector-icons/AntDesign';
import CommentIcon from 'react-native-vector-icons/Fontisto';
import ShareIcon from 'react-native-vector-icons/Fontisto';

const colors = ['grey', 'black', '#3357FF', '#FF33A6', '#FF8C33', '#8C33FF', '#33FFF5', '#F533FF', '#33FF8C', '#5733FF', '#A633FF', '#FF3380', '#FF3333', '#FF9933', '#FF33CC'];

// const persons = [
//   {
//     id: "1",
//     name: "Earnest Green",
//     country: "USA",
//     image: "https://randomuser.me/api/portraits/men/1.jpg",
//   },
//   {
//     id: "2",
//     name: "Winston Orn",
//     country: "Canada",
//     image: "https://randomuser.me/api/portraits/men/2.jpg",
//   },
//   {
//     id: "3",
//     name: "Carlton Collins",
//     country: "UK",
//     image: "https://randomuser.me/api/portraits/men/3.jpg",
//   },
//   {
//     id: "4",
//     name: "Malcolm Labadie",
//     country: "Germany",
//     image: "https://randomuser.me/api/portraits/men/4.jpg",
//   },
//   {
//     id: "5",
//     name: "Michelle Dare",
//     country: "France",
//     image: "https://randomuser.me/api/portraits/women/5.jpg",
//   },
//   {
//     id: "6",
//     name: "Carlton Zieme",
//     country: "Australia",
//     image: "https://randomuser.me/api/portraits/men/6.jpg",
//   },
//   {
//     id: "7",
//     name: "Jessie Dickinson",
//     country: "Brazil",
//     image: "https://randomuser.me/api/portraits/women/7.jpg",
//   },
//   {
//     id: "8",
//     name: "Julian Gulgowski",
//     country: "Italy",
//     image: "https://randomuser.me/api/portraits/men/8.jpg",
//   },
//   {
//     id: "9",
//     name: "Ellen Veum",
//     country: "Spain",
//     image: "https://randomuser.me/api/portraits/women/9.jpg",
//   },
//   {
//     id: "10",
//     name: "Lorena Rice",
//     country: "Mexico",
//     image: "https://randomuser.me/api/portraits/women/10.jpg",
//   },
//   {
//     id: "11",
//     name: "Carlton Zieme",
//     country: "Netherlands",
//     image: "https://randomuser.me/api/portraits/men/11.jpg",
//   },
//   {
//     id: "12",
//     name: "Jessie Dickinson",
//     country: "Japan",
//     image: "https://randomuser.me/api/portraits/women/12.jpg",
//   },
//   {
//     id: "13",
//     name: "Julian Gulgowski",
//     country: "India",
//     image: "https://randomuser.me/api/portraits/men/13.jpg",
//   },
//   {
//     id: "14",
//     name: "Ellen Veum",
//     country: "Russia",
//     image: "https://randomuser.me/api/portraits/women/14.jpg",
//   },
//   {
//     id: "15",
//     name: "Lorena Rice",
//     country: "South Africa",
//     image: "https://randomuser.me/api/portraits/women/15.jpg",
//   },
// ];


function Home({navigation}) {
  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
  const [text, setText] = useState('');
  const [submit, setSubmit] = useState('');
  const [liked, setLiked] = useState(false);
  const [likedPosts, setLikedPosts] = useState({});
  const [posts , setPosts] = useState([])
  const [loading , setLoading] = useState(true)
  const themeStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
    textColor: isDarkMode ? 'white' : 'black',
  };
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get("http://192.168.100.14:5000/api/posts/view/all");
        console.log("✅ Fetched Posts:", data);
        setPosts(data);
      } catch (error) {
        console.error("❌ Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    

  
    fetchPosts();
  }, []);
  console.log('Theme of phone is', theme);

  return (
    <View
      style={[css.container, {backgroundColor: themeStyle.backgroundColor}]}>
      <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10}} onPress={() => navigation.navigate('Search')}>
      <Image source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSm-Uy8txgYJ0j6BQr6GwZf89k0lH2i7ym5A&s'}} style={{width: 40, height: 40, backgroundColor: 'white', borderRadius: 50, right: 5, alignSelf: 'flex-end'}}/>
      </TouchableOpacity>
        <View style={{ height: 90 , marginBottom: 30}} >
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={css.boxContainer}>
          {colors.map((color, index) => (
            <View key={index} style={[css.box, { backgroundColor: color }, { flexGrow: 0 }]} />
          ))}
        </ScrollView>
        </View>
        
        
        {/*<Text style={[css.text2, { color: themeStyle.textColor }]}>Welcome to React Native!</Text>
        <Text style={[css.text2, { color: themeStyle.textColor }]}>This is my first React Native App.</Text>

        
        <Image
          style={css.image}
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAu8Y5vsm2RO9hlRUhjzKsaTjGD7zh7NoLTw&s' }}
        />

        {/* Buttons Section */}
        {/* <Button title="Click Me" onPress={() => Alert.alert('Wow! Button Clicked!')} />

        <TouchableOpacity style={css.clickable} onPress={() => Alert.alert('Wow! TouchableOpacity Clicked!')}>
          <Text style={[css.text2, { color: themeStyle.textColor }]}>Click Me</Text>
        </TouchableOpacity>

        <Pressable style={css.clickable} onLongPress={() => Alert.alert('Wow! Pressable Clicked!')}>
          <Text style={[css.text2, { color: themeStyle.textColor }]}>Click Me</Text>
        </Pressable> */} 

        {/* FlatList Section */}
        <FlatList
      data={posts}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={css.card}>
          {/* ✅ Profile Row */}
          <View style={css.profileRow}>
            <TouchableOpacity onPress={() => navigation.navigate("UserAccount", { user: item.userDetails})}>
              <Image source={{ uri:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5uiSJcqtYzfaQdLHZv7osTthNdGPRI9_7Ow&s' ||
                  user?.profilePic, }} style={css.profileImage} />
            </TouchableOpacity>
            <View style={css.userInfo}>
              <Text style={css.name}>{item.userDetails.name}</Text>
            </View>
          </View>
      
          {/* ✅ Post Content */}
          <Text style={css.postText}>{item.description}</Text>
          {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={css.postImage} />}
      

          {/* ✅ Action Buttons */}
          <View style={css.actionRow}>
            <TouchableOpacity onPress={() => toggleLike(item.id)}>
              <LikeIcon name={likedPosts[item.id] ? "heart" : "hearto"} size={30} color={likedPosts[item.id] ? "red" : "gray"} />
            </TouchableOpacity>
            <TouchableOpacity>
              <CommentIcon name="comment" size={28} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity>
              <ShareIcon name="share" size={27} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
    />
  </View>

    )}
const css = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5", // Light gray background
    paddingTop: 50,
  },
  boxContainer: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
    
    
  },
  scrollContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 34,
    fontWeight: '900',
  },
  text2: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: 'gray',
    margin: 10,
    borderRadius: 3,
    padding: 10,
  },
  box: {
    width: 75,
    height: 75,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: 'red',
    
  },
  image: {
    width: 370,
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  clickable: {
    margin: 10,
  },
 

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginHorizontal: 15,
    marginBottom: 15,
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    borderWidth: 2,
    borderColor: "#3498db", // Blue border
  },

  userInfo: {
    marginLeft: 12,
  },

  name: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#2c3e50", // Dark text
  },

  postText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    lineHeight: 22,
    marginVertical: 8,
  },

  postImage: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginVertical: 10,
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },

  actionIcon: {
    fontSize: 30,
    color: "#666",
  },

  clickable: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#ecf0f1", // Light gray background
    alignItems: "center",
  },

  // 🔹 Modern Button Styling
  button: {
    backgroundColor: "#3498db", // Blue button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default Home;
