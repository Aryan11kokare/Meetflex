import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Meeting from "../models/meeting.js";
const JWT_SECRETE = "aryansdafd";

export const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      res.status(402).json("user already created !");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email: email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json("user created succefully");
  } catch (e) {
    console.log(e);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      res.status(404).json("user not found !");
    }
    const pass = await bcrypt.compare(password, foundUser.password);
    if (!pass) {
      return res.status(401).json("Wrong password");
    }
    const token = jwt.sign(
      {
        id: foundUser._id,
      },
      JWT_SECRETE
    );
    res.status(200).json({ token: token });
  } catch (e) {
    console.log(e);
  }
};

export const getUser = async (req, res) => {
  const user = req.user;
  try {
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
};
