import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/users.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import sendSMS from "../config/sendSMS.js";

// const phoneNumber = "+251943438385";

// Create User
export const createUser = async (req, res) => {
  
  const {
    name,
    phone,
    address,
    password,
    bank_account_no,
    email,
    agreeTerms,
    imageUrl,
  } = req.body;

  console.log(req.body);

  try {
    // Check if the user with the same phone number or email already exists
    const existingUser = await User.findOne({
      $or: [{ phone }, { email }],
    });
    
    if (existingUser) {
      console.log(existingUser.phone, existingUser.email);
      return res.status(400).json({
        error: "User with this phone number or email already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new User({
      name,
      phone,
      address,
      password: hashedPassword,
      bank_account_no,
      email,
      agreeTerms,
      imageUrl: Date.now() + `/${name}`,
    });
    const MessageSendToUser = `hey ${name}  you are member of Equb system`;
    // Save the user to the database
    const savedUser = await newUser.save();
    console.log("sendSms", phone, MessageSendToUser);
    sendSMS(phone, MessageSendToUser);
    // Log the saved user details
    console.log("Saved user:", savedUser);
    // Send a success response
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while signing up" });
  }
};

// Get All Users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Users" });
  }
};

// Get User by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ name: user.name, email: user.email, imageUrl: user.imageUrl });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch User" });
  }
};

// Update User

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;

  try {
    // if (req.file) {
    //   // If a file is uploaded, upload it to Cloudinary
    //   const result = await cloudinary.v2.uploader.upload(req.file.path);
    //   updates.imageUrl = result.secure_url;
    // }

    if (updates.password !== updates.confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    if (updates.password && updates.confirmPassword) {
      const hashedPassword = await bcrypt.hash(updates.password, 10);
      updates.password = hashedPassword;
    }

    await User.findByIdAndUpdate(userId, updates);
    res.status(200).json({ message: "User details updated successfully" });
  } catch (error) {
    console.error("Error updating user details:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating user details" });
  }
};

cloudinary.config({
  cloud_name: "du9xasziv",
  api_key: "952796695462214",
  api_secret: "TI6YeNLqVWAMglzJ5I1blKSJNBQ",
});

export const uploadImage = async (req, res) => {
  try {
    console.log(req.file);
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "equb",
    });

    // Send the Cloudinary URL in the response
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error uploading image to Cloudinary" });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete User" });
  }
};

export const loginController = async function (req, res) {
  const { email, password, phone } = req.body;

  try {
    // Find the user based on the phone number
    const user = await User.findOne({
      $or: [{ phone }, { email }],
    });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid  credentials" });
    }

    // Compare the password with the hashed password
    const isPasswordValid = await comparePasswords(password, user.password);

    // Check if the password is correct
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentioals" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Send the token in the response
    res.status(200).json({ _id: user._id, token });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while logging in" });
  }
};

export const comparePasswords = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw error;
  }
};

export const logoutController = (req, res) => {
  // Clear user data from session
  req.user = null;
  res.status(200).json({ message: "Logout successful" });
};

//
// Function to send password reset email
const sendPasswordResetEmail = async (email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use SSL/TLS
      auth: {
        user: "mulukendemis44@gmail.com",
        pass: "wwgl ktvw dfmn cmwg", // Use your Gmail app password or account password
      },
    });

    const mailOptions = {
      from: "mulukendemis44@gmail.com",
      to: email,
      subject: "Password reset",
      // html: `<p>You have requested a password reset. Please follow <a href="${resetPasswordURL}">this link</a> to reset your password. This link will expire in 1 hour.</p>`,
      html: `<p>You have requested a password reset. Please follow <a href="http://localhost:5173/resetPassword/${token}">this link</a> to reset your password. This link will expire in 1 hour.</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Password reset email sent successfully");
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};

// Endpoint to initiate password reset
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a unique token
    const token = crypto.randomBytes(20).toString("hex");

    // Set token expiration time (1 hour)
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    // Save user with token
    await user.save();

    // Send password reset email
    await sendPasswordResetEmail(email, token);

    // Send success response
    return res
      .status(200)
      .json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error("Error occurred while processing password reset:", error);
    return res.status(error.statusCode || 500).json({
      error:
        error.message || "An error occurred while processing password reset",
    });
  }
};

// Endpoint to reset password
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Find user by reset token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password and clear reset token fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Save updated user
    await user.save();

    // Send success response
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error occurred while resetting password:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while resetting password" });
  }
};

// Route to handle the reset password link
export const getResetPassword = async (req, res) => {
  const { token } = req.params;

  try {
    // Find user by reset token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // Render a form for the user to reset their password
    // Here you can redirect the user to a password reset page or render a form
    // For example:
    // res.render('reset-password-form', { token }); // You need to create a reset-password-form.ejs file or use your preferred templating engine
    // Or you can redirect to a frontend route to handle the password reset process

    res.status(200).json({ message: "Redirect user to password reset page" }); // Adjust the response according to your frontend handling
  } catch (error) {
    console.error("Error occurred while handling password reset link:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while handling password reset link" });
  }
};