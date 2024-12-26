import { BadRequestError } from "../errors/index.js";
import bcrypt from "bcrypt";

const hashPassword = async (req, res, next) => {
  const password = req.body.password;

  if (password.length < 6) {
    throw new BadRequestError("Password must be at least 6 characters");
  }

  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(password, salt);
  next();
};

export default hashPassword;
