import { Register } from "../models/register.js";
import bcrypt from "bcryptjs";

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
export { showRegisterForm, registerUser, showLoginForm, loginUser, homePage };
