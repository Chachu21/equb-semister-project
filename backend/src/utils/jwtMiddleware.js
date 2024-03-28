import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ message: "No authorization header provided" });
  }

  const token = req.headers.authorization.split(" ")[1]; // Access headers using req.headers

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }

    req.user = decoded.userId;
    next();
  });
};
