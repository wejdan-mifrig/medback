import express from "express";

import { protect } from "../Middleware/Protect.Middleware.js";
import { adminOnly } from "../Middleware/Adminonly.Middleware.js";

import {
  createMessages,
  getMessages,
} from "../controller/message.controller.js";

const router = express.Router();

router.post("/create-message", createMessages);

router.get(
  "/all-messages",
  protect,
  adminOnly,
  getMessages
);

export default router;