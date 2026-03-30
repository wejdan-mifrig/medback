import express from "express"
import { 
    createCategories, 
    deleteCategory, 
    getAllCategories, 
    getCategoryById, 
    updateCategory 
} from "../controller/categories.controller.js"

const router = express.Router()

router.post("/create-category", createCategories)
router.get("/all-categories", getAllCategories)
router.get("/category/:id", getCategoryById)
router.delete("/delete-category/:id", deleteCategory)
router.put("/update-category/:id", updateCategory)

export default router