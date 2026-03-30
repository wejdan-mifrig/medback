import Products from "../model/products.model.js";

// إنشاء منتج جديد
export const createProduct = async (req, res) => {
    const { name, description, price, quantity, image, CatId, userId } = req.body;
    try {
        if (!name || !price || !quantity || !CatId) {
            return res.status(400).json({ message: "Please fill all required fields" });
        }
        const newProduct = await Products.create({
            name,
            description,
            price,
            quantity,
            image,
            CatId,
            userId
        });
        return res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error in create product", error: err.message });
    }
};

// جلب جميع المنتجات مع بيانات القسم والمستخدم
export const getAllProducts = async (req, res) => {
    try {
        const products = await Products.find().populate("CatId").populate("userId");
        return res.status(200).json(products);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching products" });
    }
};

// جلب منتج واحد بواسطة ID
export const getProductById = async (req, res) => {
    try {
        const product = await Products.findById(req.params.id).populate("CatId");
        if (!product) return res.status(404).json({ message: "Product not found" });
        return res.status(200).json(product);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching product" });
    }
};

// تعديل منتج
export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Products.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json({ message: "Updated successfully", product: updatedProduct });
    } catch (err) {
        return res.status(500).json({ message: "Error updating product" });
    }
};

// حذف منتج
export const deleteProduct = async (req, res) => {
    try {
        await Products.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Error deleting product" });
    }
};