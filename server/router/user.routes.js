import express from 'express'
import { createUser, getAllUsers, getUserById, loginUser } from '../controller/user.Controller.js'

const router = express.Router()

router.post("/register", createUser)
router.post("/login", loginUser)
router.get("/users", getAllUsers)
router.get("/user/:id", getUserById)

export default router