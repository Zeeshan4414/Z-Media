import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";

const UserAccount = ({ route }) => {
  const user = route.params?.user; // ✅ Extract user from params correctly
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Route params:", route.params);
    console.log("User object:", user);
    console.log("User ID:", user?._id);

    if (!user?._id) {
      console.error("User ID is missing!");
      setLoading(false);
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(`http://192.168.100.14:5000/api/users/${user._id}/posts`);
        setPosts(res.data.posts);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user?.id]);

  if (loading) return <ActivityIndicator size="large" color="#3498db" />;

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image source={{ uri: user?.profilePic }} style={styles.profileImage} />
        <Text style={styles.userName}>{user?.name}</Text>
      </View>

      {/* User Posts */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postDate}>
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
            <Text style={styles.postText}>{item.description}</Text>
            {item.imageUrl && (
              <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
            )}
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};
export default UserAccount;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", paddingTop: 20 },
  
  // Profile Header
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    elevation: 3,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#007bff",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 15,
  },

  // Post List
  listContent: {
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 5,
  },
  postDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  postText: {
    fontSize: 16,
    color: "#444",
    marginBottom: 8,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
});
