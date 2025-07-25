import jwt from "jsonwebtoken";

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization header missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains { id: user._id }
    next();
  } catch (err) {
    console.error("Invalid token:", err.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
