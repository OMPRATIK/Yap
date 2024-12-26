import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { NotFoundError, UnauthorizedError } from "../errors/index.js";

const authorize = async (req, _res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new UnauthorizedError("Unauthorized : No token");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    throw new UnauthorizedError("Unauthorized : Invalid token");
  }

  const user = await User.findById(decoded.userId).select("-password");
  if (!user) {
    throw new NotFoundError("User not found");
  }

  req.user = user;
  next();
};

export default authorize;
