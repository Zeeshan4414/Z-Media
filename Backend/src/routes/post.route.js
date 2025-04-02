const express = require("express");
const upload = require("../Config/uploads");
const { createPost, getAllPosts, updatePost, deletePost, getSinglePost, getOwnPosts, getRandomPosts } = require("../Controllers/post.controller");
const { route } = require("./user.route");
const authMiddleware = require("../Config/authMiddleware");

const router = express.Router();

// Route to create a post (with image upload)
router.post("/create",authMiddleware, upload.single("image"), createPost);

// Route to get all posts
// router.get("/view/:user_id", getAllPosts);
// router.get("/view/post/:post_id", getSinglePost);
router.get("/view/user",authMiddleware, getOwnPosts); 
router.get("/view/all", getRandomPosts);
router.put("/update/:postId", upload.single("image"), updatePost);

router.delete("/delete/:postId", deletePost);

module.exports = router;