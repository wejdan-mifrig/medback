import express from 'express';
import { createUser, getAllUsers, getUserById, loginUser } from '../controller/user.controller.js';
import { protect } from '../Middleware/Protect.Middleware.js';
import { adminOnly } from '../Middleware/Adminonly.Middleware.js';

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);


router.get("/users", protect, adminOnly, getAllUsers);
router.get("/user/:id", protect, getUserById);

export default router;