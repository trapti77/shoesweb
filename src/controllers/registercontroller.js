import { Register } from "../models/register.js";
import { ApiError } from "../utils/apierror.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiresponse.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose, { syncIndexes } from "mongoose";
const generateAccessTokenandRefreshToken = async (userId) => {
  try {
    //find user by userid
    const user = await Register.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    //generate access and refresh token
    const accessToken = user.generateAccessToken();
    //console.log(refreshToken)
    const refreshToken = user.generateRefreshToken();
    //console.log(refreshToken)
    user.refreshToken = refreshToken; //put this refresh token into user database
    await user.save({ validateBeforeSave: false }); //save the refresh token in user database without validation(password)

    //return kr denge accesstoken and refreshtoken
    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error generating tokens:", error.message);
    throw new ApiError(
      500,
      "something went wrong while generating refresh and access token"
    );
  }
};
const refreshAccessToken = asyncHandler(async (req, res) => {
  //we are access refresh token from cookies
  const IncomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!IncomingRefreshToken) {
    throw new ApiError(401, "unathorized request");
  }
  try {
    //verify incoming token
    const decodedToken = jwt.verify(
      IncomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await Register.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "invalid refresh token");
    }
    //match tokens
    if (IncomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "refresh token is expired or used");
    }

    //generate new token or refresh token
    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newrefreshToken } =
      await generateAccessTokenandRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newrefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newrefreshToken },
          "access token refreshed successfully"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "inavlid refresh token");
  }
});
const showRegisterForm = (req, res) => {
  res.render("register");
};

const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    // Check if user already exists
    const existingUser = await Register.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .render("register", { error: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const registercus = new Register({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    await registercus.save();
    res.status(201).render("register", {
      message: "Registration successful. Please log in.",
    });
  } catch (error) {
    res
      .status(400)
      .render("register", { error: "Registration failed. Please try again." });
  }
};

const showLoginForm = (req, res) => {
  res.render("register");
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Register.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .render("register", { error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .render("register", { error: "Invalid email or password" });
    }

    // Here you would typically create a session or JWT token
    // For simplicity, we'll just render a success page
    res.render("index", { user: user.firstname });
  } catch (error) {
    res.status(400).render("register", { error: "An error occurred" });
  }
};

const homePage = async (rq, res) => {
  res.render("index");
};
const blogPage = asyncHandler(async (req, res) => {
  res.render("blog");
});
export {
  showRegisterForm,
  registerUser,
  showLoginForm,
  loginUser,
  homePage,
  generateAccessTokenandRefreshToken,
  refreshAccessToken,
  blogPage,
};
