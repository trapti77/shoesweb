import express from "express";
import path from "path";
import dotenv from "dotenv";
import hbs from "hbs";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/registerRoutes.js";
//import blogRoutes from "./routes/blogRoute.js";
import aboutRoutes from "./routes/about.route.js";
import shopRoutes from "./routes/shop.route.js";
import productRoute from "./routes/product.route.js";
import searchRoutes from "./routes/search.route.js";
import adminRoute from "./routes/admin.route.js";
import { fileURLToPath } from "url";
import { connectDB } from "./db/conn.js"; // Import connectDB function
import paymentRoutes from "./routes/payment.route.js";

dotenv.config({
  path: "./.env",
});
// Create the equivalent of __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
// Middleware for JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "../public")));

// Set up Handlebars as the view engine and specify the views directory
const viewsPath = path.join(__dirname, "../views");
app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(cookieParser());
// Use the authentication routes
app.use("/", authRoutes);
//app.use("/", blogRoutes);
app.use("/", aboutRoutes);
app.use("/", shopRoutes);
app.use("/", productRoute);
app.use("/", searchRoutes);
app.use("/", paymentRoutes);
app.use("/", adminRoute);

// Connect to the MongoDB database
connectDB()
  .then(() => {
    // Start the server only after the database connection is established
    const PORT = process.env.PORT || 1500;
    app.listen(PORT, () => {
      console.log(`Server started at port number ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
