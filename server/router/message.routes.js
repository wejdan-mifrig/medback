import express from "express";

import {
  createMessage,
  getMessages,
  deleteMessage,
  markAsRead
} from "../controllers/message.controller.js";

const router = express.Router();


router.post("/", createMessage);


router.get("/", getMessages);


router.delete("/:id", deleteMessage);

router.put("/:id/read", markAsRead);

export default router;