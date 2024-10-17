import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema({
  contactDetails: {
    email: { type: String, required: true },
    newsletter: { type: Boolean, default: false }, // Checkbox to subscribe to news and offers
  },
  deliveryAddress: {
    country: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    apartment: { type: String, default: "" }, // Optional
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true },
    phone: { type: String, required: true },
  },
  billingAddress: {
    sameAsShipping: { type: Boolean, default: true }, // Checkbox if billing = shipping
    country: { type: String }, // Required if `sameAsShipping` is false
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    apartment: { type: String, default: "" },
    city: { type: String },
    state: { type: String },
    pinCode: { type: String },
  },
  shippingMethod: {
    method: { type: String, required: true }, // Shipping method (e.g., Standard, Express)
    cost: { type: Number, required: true },
  },
  paymentMethod: {
    method: { type: String, required: true }, // Payment method (e.g., Card, UPI, COD)
    details: {
      cardNumber: { type: String }, // Required for card payment (masked/stored securely)
      upiId: { type: String }, // Required for UPI payment
      walletId: { type: String }, // Required for Wallet payment
      bnplProvider: { type: String }, // Required for Buy Now Pay Later (BNPL)
    },
  },
  orderSummary: {
    items: [
      {
        productId: { type: String, required: true },
        productName: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    shippingCost: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  transaction: {
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    }, // Payment status
    transactionId: { type: String }, // Transaction ID from payment gateway
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  },
});

const Payment = mongoose.model("Payment", paymentSchema);
export { Payment };
