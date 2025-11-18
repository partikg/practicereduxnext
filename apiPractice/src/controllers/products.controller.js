const Product = require("../models/Product");

// GET products by category slug
exports.getProductsByCategory = async (req, res) => {
    try {
        const { slug } = req.params;

        const products = await Product.find({ category: slug });

        return res.json({
            success: true,
            products
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

// ADD PRODUCT
exports.createProduct = async (req, res) => {
    try {
        const { title, price, thumbnail, description, category } = req.body;

        if (!title || !price || !category) {
            return res.json({
                success: false,
                message: "title, price, and category are required"
            });
        }

        const product = await Product.create({
            title,
            price,
            thumbnail,
            description,
            category   // MUST match category.slug
        });

        return res.json({
            success: true,
            message: "Product added successfully",
            product
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

