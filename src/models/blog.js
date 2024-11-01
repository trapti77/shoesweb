import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: { type: String, required: true },
    tags: [String],
    thumbnail: { type: String },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
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
