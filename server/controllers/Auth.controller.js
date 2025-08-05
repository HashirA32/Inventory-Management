import { response } from "express";
import { handleError } from "../helpers/handleErr.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const Register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const checkuser = await User.findOne({ email });
    if (checkuser) {
      next(handleError(409, "User already register"));
    }
    const hashedPassword = bcryptjs.hashSync(password);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(200).json({
      success: true,
      message: "Registered successfully!",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(handleError(400, "Email and password are required."));
    }
    const user = await User.findOne({ email });

    if (!user) {
      next(handleError(409, "Invalid credentials"));
    }
    const hashedPassword = user.password;
    const isMatch = await bcryptjs.compare(password, hashedPassword);
    if (!isMatch) {
      return next(handleError(409, "Invalid credentials"));
    }

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar || "",
      },
      process.env.JWT_SECRECT_KEY
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });
    const newUser = user.toObject({ getters: true });
    delete newUser.password;
    res.status(200).json({
      success: true,
      user: newUser,
      message: "Successfully LogeIn",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const GoogleLogin = async (req, res, next) => {
  try {
    const { email, name, avatar } = req.body;

    let user;
    user = await User.findOne({ email });

    if (!user) {
      const password = Math.random().toString()
      const hashedPassword = bcryptjs.hashSync(password);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        avatar,
      });

     user = await newUser.save()
    }

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar || "",
      },
      process.env.JWT_SECRECT_KEY
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });
    const newUser = user.toObject({ getters: true });
    delete newUser.password;
    res.status(200).json({
      success: true,
      user: newUser,
      message: "Successfully LogeIn",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
