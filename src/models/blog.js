const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverimage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", userSchema);
module.exports = Blog;
