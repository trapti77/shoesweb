import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apierror.js";
import { ApiResponse } from "../utils/apiresponse.js";
import { Register } from "../models/register.js";
import { Contact } from "../models/contact.model.js";
import { Product } from "../models/product.model.js";
import { Blog } from "../models/Blog.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
/*
const getAllusers = asyncHandler(async (req, res) => {
  try {
    //const users = await Register.find({},{password:1});
    const users = await Register.find({}, { password: 0 });
    console.log(users);
    if (!users || users.length == 0) {
      throw new ApiError(404, "users not found");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, users, "user finded successfully"));
  } catch (error) {
    next(error);
  }
});
const getContacts = asyncHandler(async (req, res) => {
  try {
    const contacts = await Contact.find();
    if (!contacts || contacts.length == 0) {
      throw new ApiError(404, "contacts not find");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, contacts, "contacts  finded successfully"));
  } catch (error) {
    throw new ApiError(404, "contact not found");
  }
});
const adminPage = asyncHandler(async (req, res) => {
  res.render("admin");
});
const mainAdmin = asyncHandler(async (req, res) => {
  res.render("mainadmin");
});
const addProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, stock } = req.body;

  if (!name || !description || !price || !category) {
    throw new ApiError(400, "All fields are required");
  }

  // Handle image upload
  const imageLocalPath = req.file?.path;

  if (!imageLocalPath) {
    throw new ApiError(400, "Product image is required");
  }

  const image = await uploadOnCloudinary(imageLocalPath);

  if (!image.url) {
    throw new ApiError(400, "Error while uploading product image");
  }

  const product = await Product.create({
    name,
    description,
    price,
    category,
    stock: stock || 0,
    imageUrl: image.url,
  });

  res.status(201).json({
    status: "success",
    data: product,
  });
});

const getAllProducts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, category, active } = req.query;

  const query = {};
  if (category) query.category = category;
  if (active) query.active = active === "true";

  const products = await Product.find(query)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const total = await Product.countDocuments(query);

  res.status(200).json({
    status: "success",
    data: {
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    },
  });
});*/

// Contact Management
export const getAllContacts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const status = req.query.status;

  const query = status ? { status } : {};

  const contacts = await Contact.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Contact.countDocuments(query);

  res.status(200).json({
    success: true,
    data: contacts,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    },
  });
});

export const updateContactStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const contact = await Contact.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  if (!contact) {
    throw new ApiError(404, "Contact not found");
  }

  res.status(200).json({
    success: true,
    data: contact,
  });
});

// Blog Management
export const createBlog = asyncHandler(async (req, res) => {
  const { title, content, category, tags, status } = req.body;

  const blog = await Blog.create({
    title,
    content,
    category,
    tags,
    status,
    author: req.user._id,
    thumbnail: req.file?.path,
  });

  res.status(201).json({
    success: true,
    data: blog,
  });
});

export const getAllBlogs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const status = req.query.status;

  const query = status ? { status } : {};

  const blogs = await Blog.find(query)
    .populate("author", "name email")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Blog.countDocuments(query);

  res.status(200).json({
    success: true,
    data: blogs,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    },
  });
});

export const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (req.file) {
    updateData.thumbnail = req.file.path;
  }

  updateData.updatedAt = Date.now();

  const blog = await Blog.findByIdAndUpdate(id, updateData, {
    new: true,
  }).populate("author", "name email");

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  res.status(200).json({
    success: true,
    data: blog,
  });
});

export const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findByIdAndDelete(id);

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  res.status(200).json({
    success: true,
    message: "Blog deleted successfully",
  });
});

// Product Management
export const addProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    stock,
    features,
    specifications,
  } = req.body;

  const images = req.files?.map((file) => file.path) || [];

  const product = await Product.create({
    name,
    description,
    price,
    category,
    stock,
    images,
    features,
    specifications: new Map(Object.entries(specifications)),
  });

  res.status(201).json({
    success: true,
    data: product,
  });
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const status = req.query.status;
  const category = req.query.category;

  const query = {};
  if (status) query.status = status;
  if (category) query.category = category;

  const products = await Product.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Product.countDocuments(query);

  res.status(200).json({
    success: true,
    data: products,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    },
  });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (req.files?.length > 0) {
    updateData.images = req.files.map((file) => file.path);
  }

  if (updateData.specifications) {
    updateData.specifications = new Map(
      Object.entries(updateData.specifications)
    );
  }

  updateData.updatedAt = Date.now();

  const product = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

// User Management
export const getAllUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const role = req.query.role;

  const query = role ? { role } : {};

  const users = await Register.find(query)
    .select("-password -refreshToken")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const total = await Register.countDocuments(query);

  res.status(200).json({
    success: true,
    data: users,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    },
  });
});

export const updateUserStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, role } = req.body;

  const updateData = {};
  if (status) updateData.status = status;
  if (role) updateData.role = role;

  const user = await Register.findByIdAndUpdate(id, updateData, {
    new: true,
  }).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});
export {
  getAllContacts,
  updateContactStatus,
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getAllUsers,
  updateUserStatus,
};
