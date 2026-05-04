import Categories from "../model/categories.model.js";

export const createCategories = async (req, res) => {
    const { name, description } = req.body;
    try {
        if (!name) {
            return res.status(400).json({ message: "Please add name" });
        }
        const isExist = await Categories.findOne({ name });
        if (isExist) {
            return res.status(409).json({ message: "Category name already exist!" });
        }
        const newCategory = await Categories.create({ name, description });
        return res.status(201).json({ message: "Created successfully", category: newCategory });
    } catch (err) {
        return res.status(500).json({ message: "Internal sever error in create categories" });
    }
};

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Categories.find();
        return res.status(200).json({ message: "categories fetches successfully", categories });
    } catch (err) {
        return res.status(500).json({ message: "Internal sever error in get all categories" });
    }
};


export const getCategoryById = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Categories.findById(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        return res.status(200).json({ category });
    } catch (err) {
        return res.status(500).json({ message: "Error getting category" });
    }
};


export const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description } = req.body;

        const updated = await Categories.findByIdAndUpdate(
            id,
            { name, description },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Category not found" });
        }

        return res.status(200).json({ message: "Updated successfully", category: updated });
    } catch (err) {
        return res.status(500).json({ message: "Error updating category" });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;

        const deleted = await Categories.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: "Category not found" });
        }

        return res.status(200).json({ message: "Deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Error deleting category" });
    }
};