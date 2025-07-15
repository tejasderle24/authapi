import jwt from 'jsonwebtoken';
import User from '../models/User.Model.js';


export const protectUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token. Authorization denied." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found." });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid.", error: error.message });
  }
};
