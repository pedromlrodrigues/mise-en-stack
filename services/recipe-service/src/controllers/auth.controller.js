import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

class AuthController {
  async login(req, res) {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        }),
      });
    } else {
      res.status(401).json({ message: "Invalid username or password." });
    }
  }
}

export default new AuthController();
