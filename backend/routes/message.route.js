import express from "express";

import authorize from "../middlewares/authorize.middleware.js";
import {
  getUsers,
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", authorize, getUsers);
router.get("/:id", authorize, getMessages);
router.post("send/:id", authorize, sendMessage);

export default router;
