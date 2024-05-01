import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/users.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import sendSMS from "../config/sendSMS.js";
import cloudinary from "../utils/cloudinary.js";

// Create User
export const createUser = async (req, res) => {
  const { name, phone, password, email, agreeTerms, role } = req.body;

  // console.log(req.body);

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
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new User({
      name,
      phone,
      password,
      email,
      agreeTerms,
      role,
    });
    const savedUser = await newUser.save();
    // Send a success response
    // console.log(savedUser);
    res.status(201).json({ message: "your account created successfully" });
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
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch User" });
  }
};
//for updating users information
// export const updateUser = async (req, res) => {
//   const { updates } = req.body; // Assume updates is an object containing optional fields for updates
//   try {
//     const userId = req.params.id;
//     let updateData = {};

//     // Check if user exists
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Check if the incoming data is the same as the existing data
//     const isSameData = Object.keys(updates).every(
//       (key) => user[key] === updates[key]
//     );

//     if (isSameData) {
//       return res.status(400).json({ error: "No changes were made" });
//     }

//     // Iterate through the updates and add them to updateData
//     for (const key in updates) {
//       // Exclude password updates
//       if (key !== "password") {
//         updateData[key] = updates[key];
//       }
//     }

//     // If image URL is provided, upload it to cloudinary
//     if (updates.imageUrl) {
//       const result = await cloudinary.uploader.upload(updates.imageUrl, {
//         upload_preset: "profile",
//       });
//       updateData.imageUrl = {
//         public_id: result.public_id,
//         url: result.secure_url,
//       };
//     }

//     // Update the user
//     const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
//       new: true,
//     });

//     if (!updatedUser) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Send success response with updated user data
//     res.json(updatedUser);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Failed to update User" });
//   }
// };

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
  const { email, phone, password } = req.body;
  // Extract password from request body

  try {
    // Find the user based on the phone number or email
    const user = await User.findOne({
      $or: [{ phone }, { email }],
    }).select("+password");
    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check if password is provided
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }
    // Compare the password with the hashed password
    const isPasswordValid = await user.comparePassword(password, user.password); // Use extracted password
    // Check if the password is correct
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
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
    res.status(200).json({
      _id: user._id,
      token,
      role: user.role,
      message: "successfully logged in",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
};

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

    // // Hash the new password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // // Update user's password and clear reset token fields
    user.password = password;
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

//for testing purposes
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { updates } = req.body;
    // console.log("updates", updates);
    const updateData = {};
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user data excluding the image fields
    Object.keys(updates).forEach((key) => {
      if (key !== "password") {
        updateData[key] = updates[key];
      }
    });

    //Upload and update image fields if provided
    if (updates.imageUrl) {
      const isSameData = Object.keys(updates.imageUrl).every(
        (key) => user.imageUrl[key] === updates.imageUrl[key]
      );
      if (isSameData) {
        //sending some message for user profile image is already exsist
        return res
          .status(404)
          .json({ error: "your profile image is already exsist" });
      }
      const imageUrl = await uploadImageToCloudinary(updates.imageUrl);
      updateData.imageUrl = imageUrl;
    }
    //for uploading id image to cloudinary
    if (updates.frontImage && updates.backImage) {
      const frontUrl = await uploadImageToCloudinary(updates.frontImage);
      const backUrl = await uploadImageToCloudinary(updates.backImage);

      updateData.ID = { front: frontUrl, back: backUrl };
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    // Send success response with updated user data
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

// Function to upload image to Cloudinary
const uploadImageToCloudinary = async (imageData) => {
  // console.log("imageData:", imageData);
  try {
    const result = await cloudinary.uploader.upload(imageData, {
      upload_preset: "profile",
    });
    console.log(result);
    return { public_id: result.public_id, url: result.secure_url };
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};
