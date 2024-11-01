import jwt from "jsonwebtoken";
import { Register } from "../models/register.js";
import { ApiError } from "../utils/apierror.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/*export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
      if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await Register.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});*/
const TOKEN_TYPES = {
  BEARER: "Bearer",
};

const extractToken = (authHeader) => {
  if (!authHeader?.startsWith(TOKEN_TYPES.BEARER)) {
    return null;
  }
  return authHeader.split(" ")[1];
};

/**
 * Middleware to verify JWT tokens and attach user to request
 * @param {Object} options - Configuration options
 * @param {boolean} options.requireToken - Whether to require token (default: true)
 * @param {string[]} options.allowedRoles - Array of allowed roles (optional)
 */
export const verifyJWT = (options = { requireToken: true }) =>
  asyncHandler(async (req, res, next) => {
    try {
      // Check multiple token sources in order of preference
      const token =
        extractToken(req.headers.authorization) || req.cookies?.accessToken;

      if (!token && options.requireToken) {
        throw new ApiError(401, "Authentication required");
      }

      // Skip verification if token not required and not provided
      if (!token && !options.requireToken) {
        return next();
      }

      let decodedToken;
      try {
        decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {
          algorithms: ["HS256"], // Explicitly specify allowed algorithms
          maxAge: process.env.ACCESS_TOKEN_EXPIRY, // Add max age check
        });
      } catch (jwtError) {
        if (jwtError instanceof jwt.TokenExpiredError) {
          throw new ApiError(401, "Token has expired");
        }
        if (jwtError instanceof jwt.JsonWebTokenError) {
          throw new ApiError(401, "Invalid token");
        }
        throw jwtError;
      }

      // Fetch user and explicitly select fields we want
      const user = await Register.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );

      if (!user) {
        throw new ApiError(401, "Invalid Access Token");
      }

      if (!user.isActive) {
        throw new ApiError(403, "Account is deactivated");
      }

      // Optional role-based authorization
      //  if (
      //  options.allowedRoles?.length > 0 &&
      //  !options.allowedRoles.includes(user.role)
      // ) {
      //  throw new ApiError(403, "Insufficient permissions");
      //}
      // Attach user to request
      req.user = user;

      // Update last activity timestamp if needed
      await Register.findByIdAndUpdate(user._id, {
        lastLogin: new Date(),
      }).exec();

      return next();
    } catch (error) {
      throw new ApiError(401, error?.message || "Invalid access token");
    }
  });
