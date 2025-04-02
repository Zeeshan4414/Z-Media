const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: { type: String},
  description: { type: String },
  imageUrl: { type: String }, // Store
  //  image filename
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);