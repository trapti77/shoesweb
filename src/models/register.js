import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const registerSchema = new mongoose.Schema({
  /*
  
  verificationToken: String,
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  refreshToken: String,
  lastLogin: Date,
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: Date,
  preferences: {
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      push: {
        type: Boolean,
        default: true
      }
    },
    newsletter: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "system"
    }
  },
  
 */
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin", "moderator"],
    default: "user",
  },
  status: {
    type: String,
    enum: ["active", "inactive", "suspended", "banned"],
    default: "active",
  },
  avatar: {
    type: String,
    default: "default-avatar.png",
  },
  refreshToken: {
    type: String,
  },
  theme: {
    type: String,
    enum: ["light", "dark", "system"],
    default: "system",
  },
  metadata: {
    lastPasswordChange: Date,
    registrationIP: String,
    lastLoginIP: String,
    userAgent: String,
  },
});

//generate access token
registerSchema.methods.generateAccessToken = function () {
  //in jwt has sign method that generate tokens
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
registerSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
const Register = mongoose.model("Register", registerSchema);

export { Register };
