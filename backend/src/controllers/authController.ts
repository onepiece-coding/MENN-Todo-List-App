import { Request, Response } from "express";
import { User, validateLoginUser, validateRegisterUser } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**------------------------------------------------
 * @desc   Register User
 * @route  /api/auth/register
 * @method POST
 * @access public
---------------------------------------------------*/
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const { error } = validateRegisterUser(req.body);

    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "User exists!" });
      return;
    }

    user = await User.create({ username, email, password });
    res.status(201).json({ message: "User created", userId: user._id });
  } catch (error) {
    console.log("Server Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**------------------------------------------------
 * @desc   Login User
 * @route  /api/auth/login
 * @method POST
 * @access public
---------------------------------------------------*/
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { error } = validateLoginUser(req.body);

    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    let user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials!" });
      return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(400).json({ message: "Invalid credentials!" });
      return;
    }

    // Create JWT payload
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    // res.cookie("token", token, {
    //   // Restricts access from client-side scripts (JS)
    //   httpOnly: true,
    //   // Sent only over HTTPS
    //   secure: process.env.NODE_ENV === "production",
    //   // CSRF Attacks (XSS)
    //   sameSite: "lax",
    //   path: "/",
    //   maxAge: 24 * 60 * 60 * 1000, // 1 day
    // });

    // Send the token
    res.status(200).json({ token, message: "Logged In" });
  } catch (error) {
    console.log("Server error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**------------------------------------------------
 * @desc   Logout clears the cookie
 * @route  /api/auth/logout
 * @method POST
 * @access private (logged in user)
---------------------------------------------------*/
export const logout = async (req: any, res: Response) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out" });
};

/**------------------------------------------------
 * @desc   Return info about the current user
 * @route  /api/auth/me
 * @method GET
 * @access private (logged in user)
---------------------------------------------------*/
export const getMe = async (req: any, res: Response) => {
  const user = await User.findById(req.userId).select("-password");
  if (!user) {
    res.status(404).json({ message: "User not found!" });
    return;
  }
  res.status(200).json({ user });
};
