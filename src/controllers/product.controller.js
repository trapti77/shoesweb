import { asyncHandler } from "../utils/asyncHandler.js";

const createProduct = asyncHandler(async (req, res) => {});
const deleteProduct = asyncHandler(async (req, res) => {});
const updateProduct = asyncHandler(async (req, res) => {});
const productPage = async (req, res) => {
  res.render("products");
};

export { productPage };
