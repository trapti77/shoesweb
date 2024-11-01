import mongoose, { Schema } from "mongoose";

const ContactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    phone: {
      type: String, // Use String instead of Number
      required: [true, "Mobile number is required"],
      validate: {
        validator: function (v) {
          return /^[0-9]{10}$/.test(v); // Ensure the number is exactly 10 digits
        },
        message: "Mobile number must be a 10-digit number",
      },
    },
    message: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ["new", "read", "resolved"],
      default: "new",
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", ContactSchema);
export { Contact };
