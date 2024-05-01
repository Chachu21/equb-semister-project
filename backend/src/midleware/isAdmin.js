import User from "../models/users.js";

// isAdmin middleware function
const isAdmin = async (req, res, next) => {
  // Check if user is logged in and is an admin
  if (req.user) {
    const id = req.user;
    const user = await User.findOne({ _id: id });
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }
    if (user.role === "admin") {
      req.user = user._id;
      next();
    }
    // User is an admin, proceed to the next middleware or route handler
  } else {
    // User is not an admin, return 403 Forbidden status
    res.status(403).json({ error: "it allowed for admin only" });
  }
};

export default isAdmin;
