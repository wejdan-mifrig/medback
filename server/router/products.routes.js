import express from "express";
import { 
    createProduct, 
    getAllProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct 
} from "../controller/products.controller.js"


const router = express.Router();

router.post("/create-product", createProduct);
router.get("/all-products", getAllProducts);
router.get("/product/:id", getProductById);
router.put("/update-product/:id", updateProduct);
router.delete("/delete-product/:id", deleteProduct);

export default router;