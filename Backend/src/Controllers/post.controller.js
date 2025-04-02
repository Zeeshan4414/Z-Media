const Post = require("../models/post.model");
const mongoose = require("mongoose");
const fs = require("fs"); 
const path = require("path");
const upload = require("../Config/uploads")
// Create a new post
exports.createPost = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Request File:", req.file);
    console.log("Request User:", req.user); 
    console.log("✅ Request Received");
    
    // 🔹 Ensure Multer middleware processes the file
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded!" });
    }

    console.log("🖼 File Uploaded:", req.file);

    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded!" });
    }

    const imageUrl = req.file.path;  // If using Cloudinary, `req.file.path` is the URL
    const { title, description } = req.body;

    const newPost = new Post({
      title,
      description,
      imageUrl,
      user: userId,
    });

    await newPost.save();
    res.status(201).json({ message: "Post created successfully!", post: newPost });

  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// Get all posts
exports.getAllPosts = async (req, res) => {
    try {
        const userId = req.params.userId; // Get userId from URL parameter
        const posts = await Post.find({ user: userId }); // Fetch posts for this user
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts", error });
    }
};

exports.getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    res.json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getOwnPosts = async (req, res) => {
  try {
    console.log("Request User Object:", req.user); 
    const userId = req.user?._id; // Make sure req.user is correctly set
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    console.log("Fetching posts for user:", userId);



    const posts = await Post.find({ user: userId}).sort({ createdAt: -1 });

    console.log("Fetched Posts:", posts);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

exports.getRandomPosts = async (req, res) => {
  try {
    const randomPosts = await Post.aggregate([
      { $sample: { size: 10 } }, // Get 10 random posts
      {
        $lookup: {
          from: "users", // Name of the User collection
          localField: "user",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails", // Convert array to an object
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          imageUrl: 1,
          createdAt: 1,
          "userDetails.name": 1,
          "userDetails._id": 1, 
        },
      },
    ]);

    res.json(randomPosts);
  } catch (error) {
    console.error("❌ Error fetching random posts:", error);
    res.status(500).json({ message: "Error fetching random posts", error });
  }
};
exports.deletePost = async (req, res) => {
try {
  const { postId } = req.params;
  console.log("Received DELETE request for ID:", postId);

  // ✅ Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ error: "Invalid Post ID" });
  }

  // ✅ Check if the post exists
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  const imagePath = path.join(__dirname, "/upload", post.imageUrl);
      console.log("Image Path:", imagePath);
    // Delete the image file
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath); // Delete file
      console.log("Image deleted:", imagePath);
    } else {
      console.log("Image not found:", imagePath);
    }
  
  // ✅ Delete the post
  await post.deleteOne();
  res.json({ message: "Post deleted successfully" });

} catch (error) {
  console.error("Error deleting post:", error);
  res.status(500).json({ message: "Server error", error: error.message });
}
}
exports.updatePost = async (req, res) => {
try {
  const { postId } = req.params;
  const { title, description } = req.body;

  // Find the existing post
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  // Prepare updated data (only update if new values are provided)
  let updatedData = {
    title: title !== undefined ? title : post.title,
    description: description !== undefined ? description : post.description,
  };

  // If an image is uploaded, update it
  if (req.file) {
    const newImageUrl = `http://192.168.100.14:5000/uploads/${req.file.filename}`;

    // Delete old image file only if it exists
    if (post.imageUrl) {
      const oldImagePath = `./src/upload/${post.imageUrl.split("/").pop()}`;
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    updatedData.imageUrl = newImageUrl;
  }

  // Update the post
  const updatedPost = await Post.findByIdAndUpdate(postId, updatedData, { new: true });

  res.status(200).json({ message: "Post updated successfully", post: updatedPost });
} catch (error) {
  console.error("Update Post Error:", error);
  res.status(500).json({ message: "Server error", error: error.message });
}
};