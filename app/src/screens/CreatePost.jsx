import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import * as ImagePicker from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const CreatePostScreen = () => {
  const [postText, setPostText] = useState("");
    const [postTitle, setPostTitle] = useState("");
  const [image, setImage] = useState(null);

  // Image Picker Function
  const pickImage = async () => {
    try {
      ImagePicker.launchImageLibrary({ mediaType: "photo" }, (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorMessage) {
          Alert.alert("Error", response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          setImage(response.assets[0].uri);
        } else {
          Alert.alert("Error", "Unexpected response from image picker");
        }
      });
    } catch (error) {
      console.error("Image Picker Error:", error);
  }
  }
  // Handle Post Submission
  const handlePost = async () => {
    if (!postText.trim() || !postTitle.trim()) {
        Alert.alert("Error", "Title and Post content cannot be empty.");
        return;
      }
    
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          Alert.alert("Error", "User not authenticated.");
          return;
        }
    
        const formData = new FormData();
        formData.append("title", postTitle);        // ✅ Correct
        formData.append("description", postText); 
    
        if (image) {
            const imageType = image.split('.').pop() || "jpeg"; // Default to jpeg if extension is missing
      formData.append("image", {
        uri: image,
        type: `image/${imageType}`,
        name: `post_image.${imageType}`,
      });
          }
    
        const response = await axios.post(
          "http://192.168.100.14:5000/api/posts/create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
    
        Alert.alert("Success", "Post created successfully!");
        setPostText("");
        setPostTitle("");
        setImage(null);
      } 
        catch (error) {
            console.error("Post creation error:", error?.response?.data || error.message);
            Alert.alert("Error", error?.response?.data?.message || "Failed to create post.");
          }
      }
    
    

 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Post</Text>

      {/* Text Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Entr Title"
          placeholderTextColor="#aaa"
          value={postTitle}
          onChangeText={setPostTitle}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="What's on your mind?"
          placeholderTextColor="#aaa"
          multiline
          value={postText}
          onChangeText={setPostText}
        />
      </View>

      {/* Image Upload */}
      <TouchableOpacity style={styles.uploadContainer} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <>
            <Icon name="image" size={40} color="gray" />
            <Text style={styles.uploadText}>Upload Image</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handlePost}>
        <Icon name="send" size={20} color="white" />
        <Text style={styles.submitText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
}


export default CreatePostScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 20,
    },
    inputContainer: {
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 15,
      elevation: 3,
      marginBottom: 15,
    },
    input: {
      fontSize: 16,
      color: "#333",
    },
    uploadContainer: {
      backgroundColor: "#fff",
      borderRadius: 10,
      height: 180,
      justifyContent: "center",
      alignItems: "center",
      borderColor: "gray",
      borderWidth: 1,
      borderStyle: "dashed",
      marginBottom: 15,
    },
    uploadText: {
      color: "gray",
      marginTop: 10,
    },
    image: {
      width: "100%",
      height: "100%",
      borderRadius: 10,
    },
    submitButton: {
      backgroundColor: "#007bff",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
    },
    submitText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
      marginLeft: 10,
    },
  });
