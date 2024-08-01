import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();
const secret = process.env.JWT_SECRET;

export const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res
        .status(400)
        .send({ message: "Username and password are required" });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).send({ message: "Username is already taken" });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = await User.create({ username, password: hashedPassword });

    // Exclude password from the response
    const userResponse = {
      id: user.id,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res
      .status(201)
      .send({ message: "User registered successfully", user: userResponse });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res
        .status(400)
        .send({ message: "Username and password are required" });
    }

    const user = await User.findOne({ where: { username } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username: user.username }, secret, {
      expiresIn: "1h",
    });

    // Exclude password from the response
    const userResponse = {
      id: user.id,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.send({ token, user: userResponse });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided" });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({ message: "Failed to authenticate token" });
    }
    req.username = decoded.username;
    next();
  });
};
