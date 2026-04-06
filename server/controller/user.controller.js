import User from "../model/user.model.js"
import bcrypt from "bcryptjs"

export const createUser = async (req, res) => {
    const { name, email, password, confirm_Password } = req.body;
    try {
        if (!name || !email || !password || !confirm_Password) {
            return res.status(400).json({ message: "Please fill all fields!!" })
        }
        if (password !== confirm_Password) {
            return res.status(400).json({ message: "Password does not match!" })
        }
        const strongPasswordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
        if (strongPasswordRegex.test(password)) {
            return res.status(400).json({ message: "Password must be more than 8 chras, upper case, lower case, number and special character" })
        }
        const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailPattern.test(email)) {
            return res.status(400).json({ message: "email should be valid, contain @ and .com" })
        }

        const hashed_password = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, hashed_password, role: "user" })
        return res.status(201).json({
            message: "New user created!", user: newUser
        })

    } catch (err) {
        return res.status(500).json({ message: "Internal server error in create user!" })
    }
}







export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all fields!!" });
        }

        const isExist = await User.findOne({ email });
        if (!isExist) {
            return res.status(404).json({ message: "Email not found, register" });
        }

        const isMatch = await bcrypt.compare(password, isExist.hashed_password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password!" });
        }

        const token = jwt.sign(
            { isExist },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(200).json({ message: "Logged in successfully", user: isExist, token });

    } catch (err) {
        return res.status(500).json({ message: "Internal server error in create user!" });
    }
}

















export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find()
        if (allUsers.length === 0) {
            return res.status(200).json({ message: "No users found", users: [] })
        }
        return res.status(200).json({ message: "users get successfully", users: allUsers })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error in get all users!" })
    }
}

export const getUserById = async (req, res) => {
    const userId = req.params.id
    try {
        const user = await User.findById(userId)
        if (!user || user.length === 0) {
            return res.status(400).json({ message: "No user Found" })
        }
        return res.status(200).json({ message: "user get successfully", user })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error in get user!" })
    }
}

