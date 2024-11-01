import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apierror.js";
import { ApiResponse } from "../utils/apiresponse.js";
import { Payment } from "../models/payment.model.js";

//const createPayment = asyncHandler(async (req, res) => {});
const paymentPage = async (req, res) => {
  res.render("payment");
};

export { paymentPage };
