import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.Model.js';
import dotenv from "dotenv";
dotenv.config();

const MASTER_PASSWORD = process.env.MASTER_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;


// Register
export const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "User already exists" });

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash
    });

    await user.save();

    res.status(201).json({ msg: "Registered. " });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Login
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    let isMatch = false;

    // normal password match
    if (await bcrypt.compare(password, user.password)) {
      isMatch = true;
    }

    // master password match
    if (password === MASTER_PASSWORD) {
      isMatch = true;
    }
    console.log(MASTER_PASSWORD)

    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ msg: "Login successful", token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};