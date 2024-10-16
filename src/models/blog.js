import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    age: {
      type: Number,
      required: true,
      max: 100,
    },
    gender: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String, // Changed to String to store textual descriptions
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt timestamps
);

// Export the model
const Blog = mongoose.model("Blog", blogSchema);
export { Blog };
