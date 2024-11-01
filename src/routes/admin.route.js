import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
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
} from "../controllers/admin.controller.js";
/*const router = express.Router();
router.use(verifyJWT, adminMiddleware);
//router.route("/getusers").get(verifyJWT, adminMiddleware, getAllusers);
//router.route("/getcontacts").get(verifyJWT, getContacts);
router.route("/adminpage").get(adminPage);
router.route("/mainadmin").get(mainAdmin);

// User routes
router.route("/users").get(getAllusers);

// Contact routes
router.route("/contacts").get(getContacts);

// Product routes
router
  .route("/products")
  .get(getAllProducts)
  .post(upload.single("image"), addProduct);

export default router;*/
const router = express.Router();

// Middleware to ensure admin access
const requireAdmin = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Admin access required");
  }
  next();
});

// Apply authentication and admin check to all routes
router.use(verifyJWT(), requireAdmin);

// Contact Routes
router.get("/contacts", getAllContacts);
router.patch("/contacts/:id", updateContactStatus);

// Blog Routes
router.post("/blogs", upload.single("thumbnail"), createBlog);
router.get("/blogs", getAllBlogs);
router.patch("/blogs/:id", upload.single("thumbnail"), updateBlog);
router.delete("/blogs/:id", deleteBlog);

// Product Routes
router.post("/products", upload.array("images", 5), addProduct);
router.get("/products", getAllProducts);
router.patch("/products/:id", upload.array("images", 5), updateProduct);
router.delete("/products/:id", deleteProduct);

// User Routes
router.get("/users", getAllUsers);
router.patch("/users/:id", updateUserStatus);

export default router;
