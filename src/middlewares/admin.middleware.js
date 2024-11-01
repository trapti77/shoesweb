import jwt from "jsonwebtoken";
import { Register } from "../models/register.js";
import { ApiError } from "../utils/apierror.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const adminMiddleware = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Access denied. Admin privileges required");
  }
  next();
});
