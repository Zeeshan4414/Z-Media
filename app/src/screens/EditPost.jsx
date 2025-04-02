import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, Button, Alert } from "react-native";
import axios from "axios";
import * as ImagePicker from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditPostScreen = ({ route, navigation }) => {
  const { postId } = route.params;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(false); // To handle loading state

  useEffect(() => {
    const fetchPostDetails = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Error", "Authentication token missing.");
        navigation.goBack();
        return;
      }

      try {
        console.log("Fetching post details for:", postId);
        const response = await axios.get(
          `http://192.168.100.14:5000/api/posts/view/${postId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("API Response:", response.data);
        console.log("API Response:", JSON.stringify(response.data, null, 2));

        if (Array.isArray(response.data) && response.data.length > 0) {
            const post = response.data[0]; // Get the first post
            setTitle(post.title);
            setContent(post.description);  // Fix: API uses "description" instead of "content"
            setExistingImage(post.imageUrl);
        } else {
          Alert.alert("Error", response.data.message || "An error occurred.");
          navigation.goBack();
        }
      } catch (error) {
        console.error("Error fetching post:", error.response?.data || error.message);
        Alert.alert("Error", "Failed to fetch post details");
        navigation.goBack();
      }
    };

    fetchPostDetails();
  }, [postId]);

  const selectImage = () => {
    ImagePicker.launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) return;
      if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0]);
      }
    });
  };

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      Alert.alert("Error", "Authentication token missing.");
      return;
    }

    if (!title.trim() || !content.trim()) {
      Alert.alert("Error", "Title and Content cannot be empty.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    if (image) {
      const fileName = image.fileName || image.uri.split("/").pop(); // Fallback for fileName
      formData.append("image", {
        uri: image.uri,
        type: image.type || "image/jpeg",
        name: fileName,
      });
    }

    try {
      const response = await axios.put(
        `http://192.168.100.14:5000/api/posts/update/${postId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Update Response:", response.data);

      if (response.status === 200 || response.data.success) {
        Alert.alert("Success", "Post updated successfully!");
        navigation.setParams({ refresh: true });
navigation.goBack();
      } else {
        Alert.alert("Error", response.data.message || "Failed to update post.");
      }
    } catch (error) {
      console.error("Error updating post:", error.response?.data || error.message);
      Alert.alert("Error", "Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Edit Post</Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        style={{ borderBottomWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="Content"
        multiline
        style={{ borderBottomWidth: 1, marginBottom: 10, padding: 5 }}
      />

      {existingImage ? (
        <Image
          source={{ uri: `http://192.168.100.14:5000/${existingImage}` }}
          style={{ width: 200, height: 200, marginBottom: 10 }}
        />
      ) : null}

      {image ? (
        <Image source={{ uri: image.uri }} style={{ width: 200, height: 200, marginBottom: 10 }} />
      ) : null}

      <Button title="Select New Image" onPress={selectImage} />
      <Button title={loading ? "Updating..." : "Update Post"} onPress={handleSubmit} color="green" disabled={loading} />
    </View>
  );
};

export default EditPostScreen;

